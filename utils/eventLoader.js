const reqEvent = (event) => require(`../events/${event}`);
module.exports = (client) => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('command'));
  client.on('message', reqEvent('clearCheck'));
  client.on('message', reqEvent('dad'));
  client.on('message', reqEvent('misc'));
  client.on('guildMemberAdd', reqEvent('welcome'));
  client.on('guildMemberRemove', reqEvent('goodbye'));
  client.on('messageReactionAdd', reqEvent('reaction'));
};