module.exports = {
  name: 'advice',
  category: 'fun',
  usage: '!advice',
  blacklist: true,
  description: 'Get a random piece of advice',
  async execute(message) {
    const {
      slip: { advice },
    } = await require('node-fetch')(
      'https://api.adviceslip.com/advice'
    ).then((res) => res.json());

    message.channel.send(advice);
  },
};
