const fs = require('fs');
const Levels = require('discord-xp');
const { getChannel, toFirstUpperCase } = require('../utils/functions');

module.exports = async (client) => {
  getChannel('tyv', client).send('Online');
  client.commands
    .filter((cmd) => cmd.name)
    .forEach((cmd) =>
      console.log(`${toFirstUpperCase(cmd.name)} Command Connected`)
    );

  client.mongoose = require('../utils/mongoose');
  await Levels.setURL(process.env.MONGO)
    .then(() => console.log('EXP Module Connected'))
    .catch((err) => console.log(err));
  await client.mongoose.init();
  console.log("Everything's Connected!");
};
