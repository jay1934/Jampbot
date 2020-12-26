const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'mute',
  guildOnly: true,
  modOnly: true,
  rolePermission: 'Jamp Judge',
  aliases: ['unmute', 'tempmute'],
  category: 'moderation',
  usage:
    '![un]mute @user [reason]\n!tempmute @user <duration(10s, 12h, etc)> [reason]',
  description: 'Mutes a user',
  async execute(message, args, log) {
    const usage = '\nCorrect usage: ``!mute @user [reason]``';
    const unusage = '\nCorrect usage: ``!unmute @user [reason]``';
    const tempusage =
      '\nCorrect usage: ``!tempmute @user duration[s/m/h] [reason]';
    const member = message.mentions.members.first();
    const mainRole = message.guild.roles.cache.get('699232048644227115');
    const muteRole = message.guild.roles.cache.get('699370128889872414');
    if (message.content.includes('!mute')) {
      const reason = args.slice(1).join(' ') || 'No Reason Supplied';
      if (!member)
        return message.channel.send(
          `❌ Please mention someone to mute them.${usage}`
        );
      if (member.roles.cache.has(muteRole.id))
        return message.channel.send('❌ That user is already been muted');

      if (member.id === message.author.id)
        return message.channel.send(
          '❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>'
        );
      if (member.id === message.client.user.id)
        return message.channel.send(
          "❌ You can't mute me **I made you** <:mi_emote_o:717925349299585035>"
        );
      if (member.id === message.client.owner.id)
        return message.channel.send("❌ You can't mute my Developer :wink:");
      if (
        message.member.roles.highest.position <= member.roles.highest.position
      )
        return message.channel.send(
          '❌**Error:** Cannor mute that member because they have roles that is higher or equal to you.'
        );
      member.roles.remove(mainRole);
      member.roles.add(muteRole);

      const muteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(
          'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
        )
        .setDescription(
          `✅ **${member.user.tag}** has been successfully muted!`
        )
        .setFooter(
          `Please resort to #anti-softlock with questions or complaints on this mute`
        )
        .addField('Moderator:', message.author.tag)

        .addField('Reason', reason);
      message.channel.send(muteConfirmationEmbed);
      if (log) log.send(muteConfirmationEmbed);

      member
        .send(
          new Discord.MessageEmbed()
            .setColor('RED ')
            .setThumbnail(
              'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
            )
            .setFooter(
              `Please resort to #anti-softlock with questions or complaints on this mute`
            )
            .setDescription(
              `You have been muted in Team Jamp indefinitely :confused:`
            )
            .addField(
              'Original Moderator:',
              `${message.author.username}#${message.author.discriminator}`
            )

            .addField('Original Reason', reason)
        )
        .catch(() => {});
    } else if (message.content.includes('!unmute')) {
      if (!member)
        return message.channel.send(
          `❌ Please mention someone to unmute them.${unusage}`
        );
      if (!member.roles.cache.has(muteRole.id))
        return message.channel.send(`❌ That user is not muted`);

      const reason = args.slice(1).join(' ') || 'No Reason Supplied';
      if (member.id === message.author.id)
        return message.channel.send(
          "❌ You can't unmute yourself smh <:WeirdChamp:699435969824161823>"
        );
      if (
        message.member.roles.highest.position <= member.roles.highest.position
      )
        return message.channel.send(
          '❌**Error:** Cannor unmute that member because they have roles that is higher or equal to you.'
        );
      member.roles.remove(muteRole);
      member.roles.add(mainRole);

      if (log) {
        const unmuteConfirmationEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(
            `✅ **${member.user.tag}** has been successfully unmuted!`
          )
          .addField(
            'Moderator:',
            `${message.author.username}#${message.author.discriminator}`
          )

          .addField('Reason', reason);
        message.channel.send(unmuteConfirmationEmbed);
        log.send(unmuteConfirmationEmbed);

        member.send(
          new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(
              `You have been unmuted from Team Jamp. Please discontinue the behavior that led to your mute :confused:`
            )
            .addField('Original Moderator:', message.author.tag)
            .addField('Original Reason', reason)
        );
      }
    } else if (message.content.includes('!tempmute')) {
      const time = args[1];
      const reason = args.slice(2).join(' ') || 'No Reason Supplied';
      if (!member)
        return message.channel.send(
          `❌ Please mention someone to mute them.${tempusage}`
        );
      if (member.roles.cache.has(muteRole.id)) {
        return message.channel.send('❌ That user is already been muted');
      }
      if (member.id === message.author.id)
        return message.channel.send(
          '❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>'
        );
      if (member.id === message.client.user.id)
        return message.channel.send(
          "❌ You can't ban me **I made you** <:mi_emote_o:717925349299585035>"
        );
      if (member.id === message.client.owner.id)
        return message.channel.send("❌ You can't mute my Developer :wink:");
      if (
        message.member.roles.highest.position <= member.roles.highest.position
      )
        return message.channel.send(
          '❌**Error:** Cannor mute that member because they have roles that is higher or equal to you.'
        );

      if (!time || time <= 0)
        return message.channel.send(
          `❌ Please specify a value followed by ``s, m, or h`` to signify the time period this user will be muted.${tempusage}`
        );

      member.roles.remove(mainRole);
      member.roles.add(muteRole);

      if (log) {
        const muteConfirmationEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setThumbnail(
            'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
          )
          .setFooter(
            `Please resort to #anti-softlock with questions or complaints on this mute`
          )
          .setDescription(
            `✅ **${member.user.tag}** has been temp muted for ${ms(ms(time), {
              long: true,
            })}!`
          )
          .addField('Moderator:', message.author.tag)
          .addField('Mute Duration', time)

          .addField('Reason', reason);
        message.channel.send({
          embed: muteConfirmationEmbed,
        });
        log.send(muteConfirmationEmbed);
      }

      const muteDM = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(
          'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
        )
        .setFooter(
          `Please resort to #anti-softlock with questions or complaints on this mute`
        )
        .setDescription(
          `You have been temporarily muted in Team Jamp :confused:`
        )
        .addField('Moderator:', message.author.tag)
        .addField('Mute Duration', time)

        .addField('Reason', reason);

      member.send({ embed: muteDM });

      const unmuteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(
          `✅ **${member.user.tag}** has been successfully unmuted!`
        )
        .addField('Original Moderator:', message.author.tag)
        .addField('Original Mute Duration', time)

        .addField('Original Reason', reason);

      const unmuteDM = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(
          `You have been unmuted from Team Jamp. Please discontinue the behavior that led to your mute :confused:`
        )
        .addField(
          'Original Moderator:',
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField('Original Mute Duration', time)

        .addField('Original Reason', reason);

      setTimeout(() => {
        member.roles.add(mainRole);
        member.roles.remove(muteRole);

        member.send({ embed: unmuteDM });
        log.send(unmuteConfirmationEmbed);
      }, ms(time));
    } else {
      message.channel.send('There was a problem. Please try again later.');
    }
  },
};
