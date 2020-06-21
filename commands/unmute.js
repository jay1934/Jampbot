const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "unmute",
  modOnly: true,
  async execute(message, args) {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    let mainRole = message.guild.roles.cache.find(val => val.name === "Member");
    let muteRole = message.guild.roles.cache.find(val => val.name === "Muted");
    if (!message.mentions.users.first())
      return message.channel.send("❌ Please mention someone to mute them");
    if (!message.guild.member(user).roles.cache.has(muteRole.id)) {
      return message.channel.send("❌ That user is not muted");
    }

    let reason = args.slice(1).join(" ");
    if (!muteRole)
      return message.channel.send("❌ There is no 'Muted' role on this server");
    if (message.mentions.users.first().id === message.author.id)
      return message.channel.send(
        "❌ You can't unmute yourself smh <:WeirdChamp:699435969824161823>"
      );
    let botRolePossition = message.guild.member(message.client.user).roles
      .highest.position;
    let rolePosition = message.guild.member(user).roles.highest.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition)
      return message.channel.send(
        "❌**Error:** Cannor unmute that member because they have roles that is higher or equal to you."
      );
    if (botRolePossition <= rolePosition)
      return message.channel.send(
        "❌**Error:** Cannor unmute that member because they have roles that is higher or equal to me."
      );

    if (!reason) reason = "No reason supplied.";

    message.guild.member(user).roles.remove(muteRole);
    message.guild.member(user).roles.add(mainRole);

    if (config.channelID.modlog.length !== 0) {
      const unmuteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`✅ **${user.tag}** has been successfully unmuted!`)
        .addField(
          "Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField("Reason", reason);
      message.channel.send({
        embed: unmuteConfirmationEmbed
      });
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: unmuteConfirmationEmbed });
    }

    const unmuteDM = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        `You have been unmuted from Team Jamp. Please discontinue the behavior that led to your mute :confused:`
      )
      .addField(
        "Original Moderator:",
        `${message.author.username}#${message.author.discriminator}`
      )

      .addField("Original Reason", reason);

    user.send({ embed: unmuteDM });
  }
};
