const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "test",
  ownerOnly: true,
  async execute(message, args) {

    message.channel.send('lol')

  }
};
