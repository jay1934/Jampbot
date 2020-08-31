const Discord = require('discord.js');
const fs = require('fs');
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
client.login(process.env.TOKEN);
