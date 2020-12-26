module.exports = async (client) => {
  require('../utils/functions.js')(client);

  client.channels.cache.get('722174152357707776').send('Online');

  await require('discord-xp')
    .setURL(process.env.MONGO)
    .then(() => console.log('EXP Module Connected'));

  await require('../utils/mongoose')();
  console.log("Everything's Connected! ");
};
