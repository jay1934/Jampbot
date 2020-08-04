const fs = require('fs');
const { getChannel, toFirstUpperCase } = require('../utils/functions');

module.exports = async (client) => {
  const commandFolders = fs.readdirSync('./commands');
  for (const folder of commandFolders) {
    var commandFiles = fs.readdirSync(`./commands/${folder}`);
  }
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
