const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  blacklist: true,
  async execute(message, args) {
    let target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let createdAt = moment(target.user.createdAt).format("D MMM YYYY, h:mm a");
    let joinedAt = moment(target.joinedAt).format("D MMM YYYY, h:mm a");

    let embed = new Discord.MessageEmbed()
      .setColor(target.displayColor)
      .setThumbnail(target.user.displayAvatarURL())
      .addField("**Username**", `**${target.user.username}**`, true)
      .addField("**Account Created**", `**${createdAt}**`, true)
      .addField("**Joined Server**", `**${joinedAt}**`, true)
      .setTimestamp();
    message.channel.send(embed);
  }
};
