const Discord = require('discord.js');
const config = require('../config.json');
const { getChannel } = require('../utils/functions');

module.exports = {
  name: 'kick',
  rolePermission: 'Jampolice',
  guildOnly: true,
  category: 'moderation',
  usage: '!kick @user [reason]',
  description: 'Kicks a user',
  async execute(message, args) {
    const reason = args.slice(1).join(' ') || 'No Reason Supplied';
    const user = message.mentions.users.first();
    if (message.mentions.users.size < 1)
      return message.channel
        .send(
          `❌ You must mention someone to kick them.\nCorrect usage: \`\`${this.usage}\`\`\``
        )
        .catch(console.error);
    if (message.mentions.users.first().id === message.author.id)
      return message.channel.send(
        '❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>'
      );
    if (user.id === message.client.user.id)
      return message.channel.send(
        "❌ You can't kick me **I made you** <:mi_emote_o:717925349299585035>"
      );
    if (message.mentions.users.first().id === config.ownerid)
      return message.channel.send("❌ You can't kick my Developer:wink:");
    const botRolePossition = message.guild.member(message.client.user).roles
      .highest.position;
    const rolePosition = message.guild.member(user).roles.highest.position;
    const userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition)
      return message.channel.send(
        '❌**Error:** Cannor kick that member because they have roles that is higher or equal to you.'
      );
    if (botRolePossition <= rolePosition)
      return message.channel.send(
        '❌**Error:** Cannor kick that member because they have roles that is higher or equal to me.'
      );
    if (!message.guild.member(user).kickable) {
      message.channel.send(
        `:redTick: I cannot kick that member. My role might not be high enough or it's an internal error.`
      );
    } else {
      const member = message.mentions.members.first();
      const kickDM = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(config.thumbnails.sad)
        .setTitle('You have been kicked from Team Jamp :confused:')
        .setDescription(
          "Please do not rejoin unless you have taken time to think about what you've done and how to improve"
        )
        .addField('Reason', reason)
        .setFooter('If you have any questions, contact @Lioness100#4566');
      try {
        message.guild.member(user).ban({ reason });
      } catch (err) {
        message.channel.send('❌ Something went wrong');
        console.log(err);
      }
      try {
        user.send({ embed: kickDM });
        console.log(`Successfully sent kick message to ${user.tag}`);
      } catch (err) {
        console.log(err);
        console.log(`Unsuccessfully sent kick message to ${user.tag}`);
      }
      const kickConfirmationEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(config.thumbnails.sad)
        .setDescription(`✅ **${user.tag}** has been successfully kicked!`)
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField('Reason', reason);
      message.channel.send({
        embed: kickConfirmationEmbed,
      });
      getChannel(config.channelID.modlog, message).send({
        embed: kickConfirmationEmbed,
      });
    }
  },
};
