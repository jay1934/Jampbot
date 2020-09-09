const whiteChannels = require('../../data/whiteChannels.json');
const { getRandomInt } = require('../../utils/functions');

module.exports = async (message) => {
  const args = message.content.split(' ');
  if (
    Math.random() < 0.007 &&
    !message.author.bot &&
    whiteChannels.includes(message.channel.id) &&
    args.length > 4
  ) {
    var number = 0;
    const numberOf = getRandomInt(1, args.length / 1.5);
    while (numberOf > number) {
      const wordNumber = getRandomInt(1, args.length);
      args[wordNumber - 1] = 'jamp';
      number++;
    }
    message.channel.send(args.join(' '));
  }
};
