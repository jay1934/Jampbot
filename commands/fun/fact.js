module.exports = {
  name: 'fact',
  aliases: ['funfact', 'ff', 'randomfact'],
  blacklist: true,
  category: 'fun',
  description: 'Sends a random wikipedia fact',
  usage: '!fact',
  async execute(message) {
    require('wikifakt')
      .getRandomFact()
      .then((fact) => message.channel.send(fact));
  },
};
