// This command is not in use, but it was fun to make, so I'm keeping it just in case I need to look back on it later





const Discord = require("discord.js");
const ms = require("ms");
const ownerid = require("../config.json");
module.exports = {
  name: "giveaway",
  ownerOnly: true,
  async execute(message, args) {
    
/*    if (!args[0]) return message.channel.send(`You did not specify your time!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m") &&
      !args[0].endsWith("s")
    )
      return message.channel.send(
        `You did not use the correct formatting for the time!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
    let prize = args.slice(1).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);
    let Embed = new Discord.MessageEmbed()
      .setTitle(`🎉🎉 New giveaway! 🎉🎉`)
      .setDescription(
        `A giveaway has been started for the prize of **${prize}!**\nThe giveaway will end in **${(args[0])}!**`
      )
      .setTimestamp()
      .setColor(`GREEN`);
    let m = await message.channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Not enough people reacted for me to start draw a winner!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter(u => !u.bot)
        .random();
      const winnerE = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("🎉🎉 A winner has been chosen 🎉🎉")
        .setDescription(
          `The winner of the giveaway for **${prize}** is... ${winner}! Congrats!`
        )
        .setFooter("Please DM @Lioness100#4566 to claim your prize")
        .setThumbnail(
          "https://cdn.discordapp.com/emojis/717925533265952832.png?v=1"
        );

      channel.send({ embed: winnerE });
    }, ms(args[0])); */
  }
};
