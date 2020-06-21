// teaching the bot to require all needed packages

// this package let's us connect to Discord, and allows us to use various Discord related plugins
const Discord = require("discord.js");
const activity = require("./commands/setactivity.js");
// these packages are just helpful addons for commands, nothing important
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const ms = require("ms");
const usedCommandRecently = new Set();

// creating a new discord client (the bot)
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// teaching the bot to recognize variables from config.json
const config = require("./config.json");

// this will send the log message 'Connected!' when the bot is turned online
client.on("ready", () => {
  console.log("Connected!");
});

// this will send the log message 'Ping recieved!' when the bot is pinged
app.get("/", (request, response) => {
  console.log("Ping received!");
  response.sendStatus(200);
});

// this keeps the bot running 24/7
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// commands
const blockedChannels = require("./data/channelBlocks.json");
const blockedUsers = require("./data/userBlocks.json");
const whiteChannels = require("./data/whiteChannels.json");

client.on("message", async message => {
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (
    !message.content.startsWith(config.prefix) ||
    blockedUsers.includes(message.author.id) ||
    message.author.bot
  )
    return;
  if (message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.blacklist && blockedChannels.includes(message.channel.id)) return;
  if (command.modOnly && !message.member.hasPermission(["MANAGE_MESSAGES"]))
    return message.channel.send("❌ Insufficient permissions");
  if (command.ownerOnly && message.author.id != "381490382183333899")
    return message.channel.send("❌ Insufficient permissions");
  if (command.cooldown) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("message", message => {
  if (!whiteChannels.includes(message.channel.id)) return;
  if (message.author.bot) return;
  var dadChance = Math.random() * 100;
  if (dadChance <= 20) {
    let str = message.content;

    let modified = str
      .toLowerCase()
      .replace(/i am/g, "im")
      .replace(/[^a-z\.\?\! ]/g, "")
      .split(/\.|\?|\!/)
      .map(i => {
        i = " " + i;
        let start = i.indexOf(" im ");
        if (start === -1) {
          return;
        }
        return i.substr(start);
      })
      .filter(i => i)
      .join(" and ");

    let start;
    if (modified) {
      message.channel.send(
        `Hi ${modified
          .substr(start)
          .split(" im ")
          .map(i => i.trim())
          .filter(i => i)
          .join(" ")}, I'm Jampbot++!`
      );
    }
  } else {
    return;
  }
});

client.on("guildMemberAdd", member => {
  client.channels.cache.get(config.channelID.welcome)
    .send(`Hey ${member}, welcome to **Team Jamp!** 

**To gain access to the rest of the discord, please read <#699220667484078131> and agree to the message near the bottom**

Have a great time and remember to contact a mod with any questions ${config.pogjamper}${config.pogjamper}${config.pogjamper}`);
});

client.on("guildMemberRemove", member => {
  const memberLeave = new Discord.MessageEmbed()
    .setTitle(
      `:outbox_tray: **${member.user.username}#${member.user.discriminator}** left the server`
    )
    .setDescription(
      `They just weren't as enthusiastic 
about Jamping as you and I <:crii:715617335754621000>`
    )
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png"
    )
    .setFooter("Big RIP");

  client.channels.cache
    .get(config.channelID.modlog)
    .send({ embed: memberLeave });
});

// this allows the bot to login with tokin
client.login(process.env.TOKEN);
