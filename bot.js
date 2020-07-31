// teaching the bot to require all needed packages

// this package let's us connect to Discord, and allows us to use various Discord related plugins
const Discord = require('discord.js');

// these packages are just helpful addons for commands, nothing important

const fs = require('fs'); // file save
require('dotenv').config();

// creating a new discord client (the bot)
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

require('./utils/eventLoader.js')(client);

// creating a collection for our bot commands
client.commands = new Discord.Collection();

// reads files to see if they are in the commands folder and end in .js (reads all bot commands), then identifies them as such

const commandFiles = fs
  .readdirSync('./commands') // read all files in the commands folder
  .filter((file) => file.endsWith('.js')); // only consider .js files

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection with the key as the command name and the value as the exported module (file)
  client.commands.set(command.name, command);
}

// this allows the bot to login with token
client.login(process.env.TOKEN);
