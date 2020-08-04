const Discord = require('discord.js');
const config = require('../config.json');
const { getChannel } = require('../utils/functions');

module.exports = {
  name: 'ban',
  rolePermission: 'Jampolice',
  guildOnly: true,
  category: 'moderation',
  usage: "!ban @user <days worth of user's messages to delete (0-7)> [reason]",
  description: 'Bans a user',
  async execute(message, args) {
    const day = args[1];
    if (day < 0 || day > 7)
      return message.channel.send(
        `Specify how many day's worth of user's messages to delete.\nCorrect usage: \`\`${this.usage}\`\`\``
      );
    const reason = args.slice(2).join(' ') || 'No Reason Supplied';
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    if (message.mentions.users.size < 1)
      return message.channel
        .send(
          `❌ You must mention someone to ban them.\nCorrect usage: \`\`${this.usage}\`\`\``
        )
        .catch(console.error);
    if (message.mentions.users.first().id === message.author.id)
      return message.channel.send(
        '❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>'
      );
    if (user.id === message.client.user.id)
      return message.channel.send(
        "❌ smh you can't ban me **I made you** <:mi_emote_o:717925349299585035>"
      );
    if (message.mentions.users.first().id === config.ownerid)
      return message.channel.send("You can't ban my Developer :wink:");
    if (!day || day > 7)
      return message.channel.send(
        `You didn't enter the number of days worth of messages to delete.\nCorrect usage: \`\`${this.usage}\`\`\``
      );
    const banDM = new Discord.MessageEmbed()
      .setColor('RED')
      .setThumbnail(config.thumbnails.sad)
      .setTitle('You have been banned from Team Jamp :confused:')
      .addField('Reason', reason)
      .setFooter(
        'If you would like to appeal your ban or have any questions, contact @Lioness100#4566'
      )
      .then(() => message.guild.member(user).ban({ days: day, reason }))
      .catch((err) => {
        message.channel.send('❌ Something went wrong');
        console.log(err);
      })
      .then(() => {
        user.send({ embed: banDM });
        console.log(`Successfully sent ban message to ${user.tag}`);
      })
      .catch((err) => {
        console.log(err);
        console.log(`Unsuccessfully sent ban message to ${user.tag}`);
      });

    const banConfirmationEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setThumbnail(config.thumbnails.sad)
      .setDescription(`✅ **${user.tag}** has been successfully banned!`)
      .addField(
        'Moderator:',
        `${message.author.username}#${message.author.discriminator}`
      )
      .addField('Reason', reason);
    message.channel.send({
      embed: banConfirmationEmbed,
    });
    getChannel(config.channelID.modlog, message).send({
      embed: banConfirmationEmbed,
    });
  },
};
