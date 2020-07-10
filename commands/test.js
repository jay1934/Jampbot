const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "test",
  ownerOnly: true,
  async execute(message, args) {
const msg = message.channel.messages.fetch("731265534301044826")
msg.embeds[0].setFooter(
  "Please refrain from chatting in this channel so notes don't get drowned")
    msg.edit(
      new Discord.MessageEmbed(msg.embeds[0])
    );
    console.log('done')

  }
};
