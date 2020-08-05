const fetch = require('node-fetch');
const { getEmoji } = require('../../utils/functions');

module.exports = {
  name: 'advice',
  category: 'fun',
  usage: '!advice',
  blacklist: true,
  description: 'Get a random piece of advice',
  async execute(message, args) {
    const main = await fetch('https://api.adviceslip.com/advice');
    const mat = await main.json();

    if (!mat) {
      return message.channel.send(
        `Something went wrong ${getEmoji('SadPog', message.client)}`
      );
    }

    message.channel.send(mat.slip.advice);
  },
};
