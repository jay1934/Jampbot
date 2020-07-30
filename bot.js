// teaching the bot to require all needed packages

// this package let's us connect to Discord, and allows us to use various Discord related plugins
const Discord = require('discord.js');

// these packages are just helpful addons for commands, nothing important

const fs = require('fs'); // file save
const {
  getRandomInt,
  getUser,
  getChannel,
  getEmoji,
  hasRole,
} = require('./utils/functions');
require('dotenv').config();

// creating a new discord client (the bot)
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// creating a collection for our bot commands
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');
// creating a collection for our bot cooldowns
const cooldowns = new Discord.Collection();

// misc time counter; ignore
const newTimeCounter = new Set();

// reads files to see if they are in the commands folder and end in .js (reads all bot commands), then identifies them as such

const commandFiles = fs
  .readdirSync('./commands') // read all files in the commands folder
  .filter((file) => file.endsWith('.js')); // only consider .js files

// requires the commandFiles for future use
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection with the key as the command name and the value as the exported module (file)
  client.commands.set(command.name, command);
}

// teaching the bot to recognize variables from config.json
const config = require('./config.json');

// this will send the log message 'Connected!' when the bot is turned online
client.on('ready', () => {
  console.log('Connected!');
  getChannel('tyv', client).send('Online');
  client.user.setActivity('Jamp levels', {
    type: 'PLAYING',
    url: 'https://makerteams.net/teamjamp',
  });
});

// requires these .json files to control accessability later

// blockedChannels includes channel IDs for any channel we don't want 'fun' category commands in to prevent spam. works as a blacklist
const blockedChannels = require('./data/channelBlocks.json');

// blockedUsers includes user IDs for any user we don't want to be able to use commands, usually as a punishment for abusing the bot. works as a blacklist
const blockedUsers = require('./data/userBlocks.json');

// whiteChannels includes channel IDs for any channels we want specific commands to work in, usually for mod specific commands. works as a whitelist
const whiteChannels = require('./data/whiteChannels.json');

// see a message, sends a message. event is triggered when a message is sent while the bot is online

client.on('message', async (message) => {
  // identify args (arguments) to use in the future for multi-argument commands. for example, '!arg1 arg2' uses 2 arguments
  const args = message.content.slice(config.prefix.length).split(/ +/);

  // shift the name of the specified command to lowercase so that it will not be case sensitive either way
  const commandName = args.shift().toLowerCase();

  // basic command restrictions. if __, then cancel
  if (
    !message.content.startsWith(config.prefix) || // if the message does not start with the bot prefix, ruling out any messages that aren't commands
    blockedUsers.includes(message.author.id) || // if the message is sent by a blocked user
    message.author.bot // if the user that sent the message is a bot. this prevents infinite loops among other things
  )
    return;

  // identifying commands
  const command =
    client.commands.get(commandName) || // the command will be in the 'name' export of some file. find that file
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName) // or it will be an alias of one of the commands (listed in 'aliases' export)
    );

  // if you cannot find the file, it is not a command
  if (!command) return;

  // options (exports) that can be enabled (command.optionNameHere). if the command has any of the following options enabled:

  // command cannot be triggered in any blacklisted channels
  if (command.blacklist && blockedChannels.includes(message.channel.id)) return;

  if (
    (command.noPing && message.content.includes('@everyone')) ||
    message.content.includes(config.jamp)
  )
    return message.channel.send('<:polite:699433623962648576>');

  if (
    command.rolePermission &&
    !hasRole(message.member, command.rolePermission)
  )
    return message.channel.send('❌ Insufficient permissions');

  // command can only be triggered by owner. I just put in my ID in this case, although there are specific functions to find owners of guilds
  if (command.ownerOnly && message.author.id !== '381490382183333899')
    return message.channel.send('❌ Insufficient permissions');

  // command cannot be triggered in DMs
  if (command.guildOnly && message.channel.type !== 'text')
    return message.reply("❌ I can't execute that command inside DMs!");

  // command cannot be triggered. this is usually for command maintenance
  if (command.disabled) return;

  // command is on a specified usage cooldown
  if (command.cooldown) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    // gets current date so it can reference how long ago the cooldown was started
    const now = Date.now();

    // gets the specified cooldown in milliseconds from the specific command
    const timestamps = cooldowns.get(command.name);

    // creates a cooldown constant to reference how long the cooldown will last. Is there is no specified cooldown, default to 3 seconds
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // only cancels the command if the cooldown was for that specific user, giving individual timer capabilities
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      // finds how much longer the cooldown will be in effect by considering the current time, the time the cooldown was started, and the cooldown length
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          `❌ Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`\`${command.name}\`\` command.`
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  // actually executing the commands
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send(
      '❌ There was an error trying to execute that command!'
    );
  }
});

client.on('message', async (message) => {
  if (
    message.type === 'PINS_ADD' &&
    message.channel.id === config.channelID.notes
  )
    message.delete();

  if (
    message.channel.id === config.channelID.initiation &&
    message.author.id === config.deluxe
  ) {
    await message.react('699436048693985321');
    await message.react('717925533265952832');
  }
});

//* trigger when a message is sent
client.on('message', async (message) => {
  // if message is sent by Jampbot Deluxe
  if (
    ////message.author.id === config.deluxe &&
    message.content.includes('‣You have cleared') &&
    message.content.includes('‣You have earned')
  ) {
    try {
      // get the level name; everything within the single quotes
      const level = message.content.match(/'(.+)'/);
      const creator = message.content.match(/ by (.+?)(?=\s<a?:)+/);
      if (/<@!?(\d+)>/.test(creator[1])) {
        const noPingExec = creator[1].match(/<@!?(\d+)>/);
        creator[1] = getUser(noPingExec[1], message).username;
      }
      const pointsEarned = message.content.match(
        /((?:[0-6]\d|[0-9])(?:\.\d)?) points?/
      );
      let exec = message.content.match(/.+?(?=<a?:)/).toString();
      if (/<@!?(\d+)>/.test(exec)) {
        const noPingExec = exec.match(/<@!?(\d+)>/);
        exec = getUser(noPingExec[1], message).username;
      }
      const emote = message.content.match(/:((?:\w+Jamper|Jumper)):/);
      if (pointsEarned[1] > 5.9) {
        getChannel(config.channelID.modlog, message).send(
          `🔴 **${exec} **${getEmoji(
            emote[1],
            message
          )} submitted a clear for **${level[1]}** by **${
            creator[1]
          }** and has earned **${pointsEarned[0]}** 🔴`
        );
      } else {
        console.log(
          `🔴 **${exec} **${getEmoji(
            emote[1],
            message
          )} submitted a clear for **${level[1]}** by **${
            creator[1]
          }** and has earned **${pointsEarned[0]}** 🔴`
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
});

client.on('message', async (message) => {
  const args = message.content.split(' ');
  if (
    Math.random() < 0.003 &&
    !message.author.bot &&
    whiteChannels.includes(message.channel.id) &&
    args.length > 4
  ) {
    var number = 0;
    const numberOf = getRandomInt(1, args.length / 1.5);
    while (numberOf > number) {
      const wordNumber = getRandomInt(1, args.length);
      args[wordNumber - 1] = 'jamp';
      number++;
      console.log(numberOf);
    }
    console.log(args.join(' '));
    message.channel.send(args.join(' '));
  }
});

/* this was just a funny joke i made. if anyone says "Im" or "I am", Jampbot will take the rest of their message and form a response, "Hi [message
remainder], I'm Jampbot++!" It's a bit more technical so that it can work... well. but that's the simplified version */
client.on('message', async (message) => {
  if (message.content.toLowerCase() === 'jampbot yes')
    message.channel.send(':)');
  if (message.content.toLowerCase() === 'jampbot no') {
    if (Math.random() > 0.3) message.channel.send(':(');
    else message.channel.send('sleep with one eye open');
  }
  if (message.content.toLowerCase() === 'jampbot why')
    message.channel.send('O_o');
  if (message.content.toLowerCase() === 'jampbot pls')
    message.channel.send(';)');
  // if message includes some form of 'im' bored, send a remind that *you can use !rps to play rock paper scissors* ;)
  const found = message.content
    .toLowerCase()
    .match(/i.{0,10}b+\s*o+\s*r+\s*e+\s*d/);
  if (found && !newTimeCounter.has('cooldown')) {
    // eslint-disable-next-line no-redeclare
    newTimeCounter.add('cooldown');
    message.channel.send(
      `Are you bored? Try using \`\`!rps\`\` or \`\`quag\`\` in <#${config.channelID.spam}> <:BuzzyGoodMan:727242865322754139>`
    );
    setTimeout(function () {
      newTimeCounter.delete('cooldown');
    }, 1800000);
    return;
  }

  // this function only works in general channels (in this case, the whitelisted channels), to prevent unneeded spam
  if (!whiteChannels.includes(message.channel.id)) return;

  // if the function was triggered by a bot, cancel. Jampbot will say "I'm Jampbot++" in it's response, which would cause an infinite loop
  if (message.author.bot) return;

  // as an extra step to avoid unneeded spam and annoyance, I set the function to only fully trigger 20% of the time
  const dadChance = Math.random();

  // if the 5% chance is successful...
  if (dadChance <= 0.05) {
    const str = message.content;

    const modified = str
      .toLowerCase()
      .replace(/i am/g, 'im')
      .replace(/[^a-z\.\?\! ]/g, '')
      .split(/\.|\?|\!/)
      .map((i) => {
        i = ` ${i}`;
        const start = i.indexOf(' im ');
        if (start === -1) {
          return;
        }
        return i.substr(start);
      })
      .filter((i) => i)
      .join(' and ');

    let start;
    if (modified) {
      message.channel.send(
        `Hi ${modified
          .substr(start)
          .split(' im ')
          .map((i) => i.trim())
          .filter((i) => i)
          .join(' ')}, I'm Jampbot++!`
      );
    }
  }
});

// when a new user joins Team Jamp, send a welcome message in our welcome channel. this message is easily configurable to suit individual needs
client.on('guildMemberAdd', (member) => {
  getChannel(config.channelID.welcome, client)
    .send(`Hey ${member}, welcome to **Team Jamp!** 

**To gain access to the rest of the discord, please read <#699220667484078131> and agree to the message near the bottom**

Have a great time and remember to contact a mod with any questions ${config.pogjamper}${config.pogjamper}${config.pogjamper}`);
});

// when a user leaves Team Jamp, just leave a message is the moderation logs in case it's a notable member
client.on('guildMemberRemove', (member) => {
  // make an embed
  const memberLeave = new Discord.MessageEmbed()
    .setTitle(
      `:outbox_tray: **${member.user.username}#${member.user.discriminator}** left the server`
    )
    .setDescription(
      `They just weren't as enthusiastic 
about Jamping as you and I <:crii:715617335754621000>`
    )
    .setThumbnail(
      'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
    )
    .setFooter('Big RIP');

  // send the embed in mod logs
  getChannel(config.channelID.modlog, client).send({ embed: memberLeave });
});

client.on('messageReactionAdd', async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  // Now the message has been cached and is fully available
  if (user.bot) return;
  if (
    !reaction.message.author.bot ||
    reaction.message.channel.id !== config.channelID.notes
  )
    return;
  if (reaction.emoji.name === '👍') {
    reaction.message.embeds[0].setColor('RED');
    reaction.message.embeds[0].setFooter(
      'This note is resolved. React again to mark as unresolved'
    );
    await reaction.message.edit(
      new Discord.MessageEmbed(reaction.message.embeds[0])
    );
    await reaction.message.reactions.removeAll();
    await reaction.message.react('👎');
    await reaction.message.unpin();
  } else if (reaction.emoji.name === '👎') {
    reaction.message.embeds[0].setColor('GREEN');
    reaction.message.embeds[0].setFooter('React to mark as resolved');
    await reaction.message.edit(
      new Discord.MessageEmbed(reaction.message.embeds[0])
    );
    await reaction.message.reactions.removeAll();
    await reaction.message.react('👍');
    await reaction.message.pin();
  }
});

// this allows the bot to login with token
client.mongoose.init();
client.login(process.env.TOKEN);
