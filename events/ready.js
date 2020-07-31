const fs = require('fs');
const { getChannel, toFirstUpperCase } = require('../utils/functions');

module.exports = async (client) => {
  const commandFiles = fs
    .readdirSync('./commands') // read all files in the commands folder
    .filter((file) => file.endsWith('.js')); // only consider .js files
  getChannel('tyv', client).send('Online');
  client.user.setActivity('Jamp levels', {
    type: 'PLAYING',
    url: 'https://makerteams.net/teamjamp',
  });
  console.log(
    commandFiles
      .map(
        (cmd) => `${toFirstUpperCase(cmd.replace('.js', ''))} Command Connected`
      )
      .join('\n')
  );
  client.mongoose = require('../utils/mongoose');
  await client.mongoose.init();
  console.log("Everything's Connected!");
};
