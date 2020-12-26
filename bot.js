const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
require('dotenv').config();

const client = new Client({
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

client.commands = new Collection();
for (const folder of readdirSync('./commands'))
  for (const file of readdirSync(`./commands/${folder}`)) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }

client.login(process.env.TOKEN);
