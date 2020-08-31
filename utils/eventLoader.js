const { schedule } = require('./functions');

const reqEvent = (event) => require(`../events/${event}`);
module.exports = (client) => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message/newChannel'));
  client.on('message', reqEvent('message/exp'));
  client.on('message', reqEvent('message/command'));
  client.on('message', reqEvent('message/clearCheck'));
  client.on('message', reqEvent('message/dad'));
  client.on('message', reqEvent('message/misc'));
  client.on('guildMemberAdd', reqEvent('welcome'));
  client.on('guildMemberRemove', reqEvent('goodbye'));
  client.on('messageReactionAdd', reqEvent('reaction'));
  schedule('12:00', () => reqEvent('deprecate')(client));
};
