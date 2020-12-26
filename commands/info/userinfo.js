const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['uinfo'],
  blacklist: true,
  guildOnly: true,
  category: 'info',
  usage: '!userinfo [@user]',
  descriptions: "Gets a user's info",
  async execute(message, args) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    message.channel.send(
      new (require('discord.js').MessageEmbed)()
        .setColor(member.displayColor)
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
          { name: '**Username**', value: `**${member.username}**` },
          {
            name: '**Account Created**',
            value: `**${moment(member.user.createdAt).format(
              'D MMM YYYY, h:mm a'
            )}**`,
          },
          {
            name: '**Joined Server**',
            value: `**${moment(member.joinedAt).format(
              'D MMM YYYY, h:mm a'
            )}**`,
          },
          {
            name: '**EXP Level**',
            value: `**${
              (await require('discord-xp').fetch(member.id, message.guild.id)
                .level) || 0
            }**`,
          },
          {
            name: '**Jamper Rank**',
            value: `**${
              member.roles.cache.find((x) => /J[au]mper/.test(x.name)).name
            }**`,
          }
        )
        .setTimestamp()
    );
  },
};
