const Discord = require('discord.js');
const ms = require('ms');
const config = require('../../config.json');
const { getRole, getChannel } = require('../../utils/functions');

module.exports = {
  name: 'lockdown',
  aliases: ['unlock', 'templd'],
  rolePermission: 'Jampolice',
  category: 'moderation',
  usage:
    '!lockdown [reason]\n!unlock [reason]\n!templd <duration(10s, 12h, etc)> [reason]',
  description: 'Restricts message-sending permissions in channel',
  async execute(message, args) {
    const { channel } = message;
    const reason = args.slice(0).join(' ') || 'No Reason Specified';
    const Member = getRole('Member', message);

    if (message.content.includes('!unlock')) {
      channel.updateOverwrite(Member, { SEND_MESSAGES: true }, reason);
      const deLDembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(config.thumbnails.sad)
        .setDescription(`✅ **${channel}** has been successfully unlocked!`)
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField('Reason', reason);
      message.channel.send({
        embed: deLDembed,
      });
      getChannel(config.channelID.modlog, message).send({ embed: deLDembed });
    } else if (message.content.includes('!lockdown')) {
      channel.updateOverwrite(Member, { SEND_MESSAGES: false }, reason);
      const LDembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(config.thumbnails.sad)
        .setDescription(`✅ **${channel}** has been successfully locked!`)
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField('Reason', reason);
      message.channel.send({
        embed: LDembed,
      });
      getChannel(config.channelID.modlog, message).send({ embed: LDembed });
    } else if (message.content.includes('!templd')) {
      const usage = '\nCorrect usage: ``!templd duration[s/m/h] [reason]``';
      const reason = args.slice(1).join(' ') || 'No Reason Supplied';
      const time = args[0];
      if (!time || time <= 0)
        return message.channel.send(
          `❌ Please specify a value followed by ``s, m, or h`` to signify the time period this channel will be locked.${usage}`
        );
      channel.updateOverwrite(Member, { SEND_MESSAGES: false }, reason);
      const tempLDembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(config.thumbnails.sad)
        .setDescription(
          `✅ **${channel}** has been temporarily locked for ${ms(ms(time), {
            long: true,
          })}!`
        )
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField('Reason', reason);
      message.channel.send({
        embed: tempLDembed,
      });
      getChannel(config.channelID.modlog, message).send({ embed: tempLDembed });
      setTimeout(function () {
        channel.updateOverwrite(Member, { SEND_MESSAGES: true }, reason);
        const deLDembed = new Discord.MessageEmbed()
          .setColor('RED')
          .setThumbnail(config.thumbnails.sad)
          .setFooter(`Channel was locked for ${ms(ms(time), { long: true })}`)
          .setDescription(`✅ **${channel}** has been successfully unlocked!`)
          .addField(
            'Original Moderator:',
            `${message.author.username}#${message.author.discriminator}`
          )

          .addField('Original Reason', reason);
        message.channel.send({
          embed: deLDembed,
        });
        getChannel(config.channelID.modlog, message).send({ embed: deLDembed });
      }, ms(time));
    } else {
      message.channel.send('❌ Something went wrong. Please try again later.');
    }
  },
};
