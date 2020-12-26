module.exports = {
  name: 'dadjoke',
  blacklist: true,
  category: 'fun',
  usage: '!dadjoke',
  description: 'Sends a random dad joke (be prepared)',
  async execute(message) {
    require('give-me-a-joke').getRandomDadJoke((joke) =>
      message.channel.send(joke)
    );
  },
};
