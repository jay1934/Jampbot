module.exports = {
  name: 'fact',
  aliases: ['funfact', 'ff', 'randomfact'],
  blacklist: true,
  async execute(message, args) {
    var WikiFakt = require('wikifakt');

    // Get a fact
    WikiFakt.getRandomFact().then(function (fact) {
      message.channel.send(fact);
    });
  },
};
