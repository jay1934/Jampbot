const Discord = require('discord.js');
const ms = require('ms');
const config = require('../config.json');

module.exports = {
  name: 'lockdown',
  aliases: ['unlock', 'templd'],
  blacklist: true,
  modOnly: true,
  async execute(message, args) {
    const { channel } = message;
    let reason = args.slice(0).join(' ');
    if (!reason) reason = 'No reason specified';
    const Member = message.guild.roles.cache.get('699232048644227115');

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
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: deLDembed });
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
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: LDembed });
    } else if (message.content.includes('!templd')) {
      const usage = '\nCorrect usage: ``!templd duration[s/m/h] [reason]``';
      const reason = args.slice(1).join(' ');
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
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: tempLDembed });
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
        message.client.channels.cache
          .get(config.channelID.modlog)
          .send({ embed: deLDembed });
      }, ms(time));
    } else {
      message.channel.send('❌ Something went wrong. Please try again later.');
    }
  },
};
