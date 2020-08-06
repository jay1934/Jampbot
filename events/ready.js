const fs = require('fs');
const Levels = require('discord-xp');
const { getChannel, toFirstUpperCase } = require('../utils/functions');

module.exports = async (client) => {
  const commandFolders = fs.readdirSync('./commands');
  for (const folder of commandFolders)
    var commandFiles = fs.readdirSync(`./commands/${folder}`);
  getChannel('tyv', client).send('Online');
  console.log(
    commandFiles
      .map(
        (cmd) => `${toFirstUpperCase(cmd.replace('.js', ''))} Command Connected`
      )
      .join('\n')
  );
  client.mongoose = require('../utils/mongoose');
  await Levels.setURL(process.env.MONGO)
    .then(() => console.log('EXP Module Connected'))
    .catch((err) => console.log(err));
  await client.mongoose.init();
  console.log("Everything's Connected!");
};
