const Discord = require("discord.js");
module.exports = {
  name: "dadjoke",
  blacklist: true,
  async execute(message, args) {
    let giveMeAJoke = require("give-me-a-joke");
    giveMeAJoke.getRandomDadJoke(function(joke) {
      message.channel.send(joke);
    });
  }
};
