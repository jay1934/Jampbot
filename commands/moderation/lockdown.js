const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'lockdown',
  aliases: ['unlock', 'templd'],
  modOnly: true,
  category: 'moderation',
  usage:
    '!lockdown [reason]\n!unlock [reason]\n!templd <duration(10s, 12h, etc)> [reason]',
  description: 'Restricts message-sending permissions in channel',
  async execute(message, args, log) {
    const reason = args.slice(0).join(' ') || 'No Reason Specified';
    const Member = message.guild.roles.cache.get('699232048644227115');

    if (message.content.includes('!unlock')) {
      message.channel.updateOverwrite(Member, { SEND_MESSAGES: true }, reason);
      const deLDembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(
          'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
        )
        .setDescription(
          `✅ **${message.channel}** has been successfully unlocked!`
        )
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField('Reason', reason);
      message.channel.send({
        embed: deLDembed,
      });
      if (log) log.send(deLDembed);
    } else if (message.content.includes('!lockdown')) {
      message.channel.updateOverwrite(Member, { SEND_MESSAGES: false }, reason);
      const LDembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(
          'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
        )
        .setDescription(
          `✅ **${message.channel}** has been successfully locked!`
        )
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField('Reason', reason);
      message.channel.send({
        embed: LDembed,
      });
      if (log) log.send(LDembed);
    } else if (message.content.includes('!templd')) {
      const usage = '\nCorrect usage: ``!templd duration[s/m/h] [reason]``';
      const reason = args.slice(1).join(' ') || 'No Reason Supplied';
      const time = args[0];
      if (!time || time <= 0)
        return message.channel.send(
          `❌ Please specify a value followed by ``s, m, or h`` to signify the time period this channel will be locked.${usage}`
        );
      message.channel.updateOverwrite(Member, { SEND_MESSAGES: false }, reason);
      const tempLDembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(
          'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
        )
        .setDescription(
          `✅ **${message.channel}** has been temporarily locked for ${ms(
            ms(time),
            {
              long: true,
            }
          )}!`
        )
        .addField(
          'Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField('Reason', reason);
      message.channel.send({
        embed: tempLDembed,
      });
      if (log) log.send(tempLDembed);
      setTimeout(function () {
        message.channel.updateOverwrite(
          Member,
          { SEND_MESSAGES: true },
          reason
        );
        const deLDembed = new Discord.MessageEmbed()
          .setColor('RED')
          .setThumbnail(
            'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
          )
          .setFooter(`Channel was locked for ${ms(ms(time), { long: true })}`)
          .setDescription(
            `✅ **${message.channel}** has been successfully unlocked!`
          )
          .addField(
            'Original Moderator:',
            `${message.author.username}#${message.author.discriminator}`
          )

          .addField('Original Reason', reason);
        message.channel.send(deLDembed);
        if (log) log.send(deLDembed);
      }, ms(time));
    } else {
      message.channel.send('❌ Something went wrong. Please try again later.');
    }
  },
};
