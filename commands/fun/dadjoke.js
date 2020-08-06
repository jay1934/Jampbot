module.exports = {
  name: 'dadjoke',
  blacklist: true,
  category: 'fun',
  usage: '!dadjoke',
  description: 'Sends a random dad joke (be prepared)',
  async execute(message, args) {
    const giveMeAJoke = require('give-me-a-joke');
    giveMeAJoke.getRandomDadJoke((joke) => message.channel.send(joke));
  },
};
