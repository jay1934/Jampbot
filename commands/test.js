const config = require ("../config.json")
module.exports = {
  name: "test",
  cooldown: 5,
  execute(message, args) {
    message.channel.send('I AM ALIVE');
  }
};
