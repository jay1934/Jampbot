const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "mute",
  modOnly: true,
  async execute(message, args) {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    let mainRole = message.guild.roles.cache.find(val => val.name === "Member");
    let muteRole = message.guild.roles.cache.find(val => val.name === "Muted");
    let reason = args.slice(1).join(" ");
    if (!muteRole)
      return message.channel.send("❌ There is no 'Muted' role on this server");
    if (!message.mentions.users.first())
      return message.channel.send("❌ Please mention someone to mute them");
    if (message.guild.member(user).roles.cache.has(muteRole.id)) {
      return message.channel.send("❌ That user has already been muted");
    }
    if (message.mentions.users.first().id === message.author.id)
      return message.channel.send(
        "❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>"
      );
    if (user.id === message.client.user.id)
      return message.channel.send(
        "❌ You can't mute me **I made you** <:mi_emote_o:717925349299585035>"
      );
    if (message.mentions.users.first().id === config.ownerid)
      return message.channel.send("❌ You can't mute my Developer :wink:");
    let botRolePossition = message.guild.member(message.client.user).roles
      .highest.position;
    let rolePosition = message.guild.member(user).roles.highest.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition)
      return message.channel.send(
        "❌**Error:** Cannor mute that member because they have roles that is higher or equal to you."
      );
    if (botRolePossition <= rolePosition)
      return message.channel.send(
        "❌**Error:** Cannor mute that member because they have roles that is higher or equal to me."
      );

    if (!reason) reason = "No reason supplied.";

    message.guild.member(user).roles.remove(mainRole);
    message.guild.member(user).roles.add(muteRole);

    if (config.channelID.modlog.length !== 0) {
      const muteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(config.thumbnails.sad)
        .setDescription(`✅ **${user.tag}** has been successfully muted!`)
        .addField(
          "Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField("Reason", reason);
      message.channel.send({
        embed: muteConfirmationEmbed
      });
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: muteConfirmationEmbed });
    }

    const muteDM = new Discord.MessageEmbed()
      .setColor("RED")
      .setThumbnail(config.thumbnails.sad)
      .setDescription(
        `You have been muted in Team Jamp indefinitely :confused:`
      )
      .addField(
        "Original Moderator:",
        `${message.author.username}#${message.author.discriminator}`
      )

      .addField("Original Reason", reason);

    user.send({ embed: muteDM });
  }
};
