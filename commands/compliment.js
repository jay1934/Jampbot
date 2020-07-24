const compliments = require('../data/compliments.json');
const { getRandomArrElement } = require('../utils/functions');

module.exports = {
  name: 'compliment',
  blacklist: true,
  execute(message, args) {
    const user = message.mentions.members.first();
    if (!user)
      return message.channel.send('❌ Tag someone to send them a compliment!');

    if (user.id === message.author.id) {
      return message.channel.send(
        `*Well you're a little narcissistic* :rolling_eyes:`
      );
    }
    return message.channel.send(
      `**<@${user.username}>**, ${getRandomArrElement(compliments)} :heart:`
    );
  },
};
