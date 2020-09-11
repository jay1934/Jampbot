const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
require('dotenv').config();

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  disableMentions: 'everyone',
  presence: {
    activity: {
      name: 'Jamp Levels',
      type: 'PLAYING',
    },
  },
});
require('./utils/eventLoader.js')(client);

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`);
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
client.on('messageDelete', (message) => {
  if (message.author.bot) return;
  message.channel.messages
    .fetch({ limit: 1, before: message.id })
    .then((msg) => {
      console.log(
        `${message.author.tag}'s message \`${message.content}\` in #${
          message.channel.name
        }  (in response to ${msg.first().author.username}'s message: \`${
          msg.first().content
        }\`) was deleted at ${moment(new Date()).format('h:mm a')}.`
      );
    });
});

client.login(process.env.TOKEN);
