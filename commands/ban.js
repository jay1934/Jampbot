const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "ban",
  modOnly: true,
  guildOnly: true,
  async execute(message, args) {
    const usage = "\nCorrect usage: ``!ban @user [reason]``"
    let reason = args.slice(1).join(" ");
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1)
      return message.channel
        .send(`❌ You must mention someone to ban them.${usage}`)
        .catch(console.error);
    if (message.mentions.users.first().id === message.author.id)
      return message.channel.send(
        "❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>"
      );
    if (user.id === message.client.user.id)
      return message.channel.send(
        "❌ smh you can't ban me **I made you** <:mi_emote_o:717925349299585035>"
      );
    if (message.mentions.users.first().id === config.ownerid)
      return message.channel.send("You can't ban my Developer :wink:");
    if (reason.length < 1) reason = "No reason supplied.";
    let botRolePossition = message.guild.member(message.client.user).roles
      .highest.position;
    let rolePosition = message.guild.member(user).roles.highest.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition)
      return message.channel.send(
        "❌**Error:** Cannor ban that member because they have roles that is higher or equal to you."
      );
    if (botRolePossition <= rolePosition)
      return message.channel.send(
        "❌**Error:** Cannor ban that member because they have roles that is higher or equal to me."
      );
    if (!message.guild.member(user).bannable) {
      message.channel.send(
        `❌ I cannot ban that member. My role might not be high enough or it's an internal error.`
      );
      return;
    } else {
      const banDM = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(config.thumbnails.sad)
        .setTitle("You have been banned from Team Jamp :confused:")
        .addField("Reason", reason)
        .setFooter(
          "If you would like to appeal your ban or have any questions, contact @Lioness100#4566"
        );
      user
        .send({ embed: banDM })
        .then(function() {
          message.member.ban();
          console.log(`Successfully sent ban message to ${message.member.tag}`);
        })
        .catch(function() {
          message.member.ban();
          console.log(`Unsuccessfully sent ban message to ${user.tag}`);
        });
      await message.guild.members.ban(user, reason);

      const banConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(config.thumbnails.sad)
        .setDescription(`✅ **${user.tag}** has been successfully banned!`)
        .addField(
          "Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField("Reason", reason);
      message.channel.send({
        embed: banConfirmationEmbed
      });
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: banConfirmationEmbed });
    }
  }
};
