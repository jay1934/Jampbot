const Discord = require('discord.js');
const Levels = require('discord-xp');
const { hasRole } = require('../../utils/functions');

module.exports = async (message) => {
  const cooldowns = new Discord.Collection();

  const config = require('../../config.json');
  // requires these .json files to control accessability later

  // blockedChannels includes channel IDs for any channel we don't want 'fun' category commands in to prevent spam. works as a blacklist
  const blockedChannels = require('../../data/channelBlocks.json');

  // blockedUsers includes user IDs for any user we don't want to be able to use commands, usually as a punishment for abusing the bot. works as a blacklist
  const blockedUsers = require('../../data/userBlocks.json');

  // whiteChannels includes channel IDs for any channels we want specific commands to work in, usually for mod specific commands. works as a whitelist
  const whiteChannels = require('../../data/whiteChannels.json');

  // see a message, sends a message. event is triggered when a message is sent while the bot is online

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
    message.client.commands.get(commandName) || // the command will be in the 'name' export of some file. find that file
    message.client.commands.find(
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

    if (command.setLevel) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      if (!user || user.level < command.setLevel)
        return message.channel.send(
          `You need to be at least **level ${command.setLevel}** to use that command <:SadPog:710543485849174067>`
        );
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
};
