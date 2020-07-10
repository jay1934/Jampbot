const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "test",
  ownerOnly: true,
  async execute(message, args) {
    const msg = message.channel.messages.fetch("731265534301044826")
    const newE = new Discord.MessageEmbed()
      .setTitle('Welcome!')
      .setDescription('This channel can be used as a to-do list (for example, a note could read ``discuss rerating _____ level``), or as an easy way to remember things.\n\nTo add a note, simply use ``!note message`` in any channel (preferably not this one). Unresolved notes will be pinned.')
      .setFooter("Please refrain from chatting in this channel so notes don't get drowned")
      message.channel.messages.fetch({around: "731265534301044826", limit: 1})
    .then(msg => {
        const fetchedMsg = msg.first();
        fetchedMsg.edit(newE);
    });
    message.delete()
    console.log('done')

  }
};
