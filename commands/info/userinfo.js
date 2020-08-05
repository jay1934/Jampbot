const Discord = require('discord.js');
const moment = require('moment');
const Levels = require('discord-xp');
const { hasRole } = require('../../utils/functions.js');

module.exports = {
  name: 'userinfo',
  aliases: ['uinfo'],
  blacklist: true,
  guildOnly: true,
  category: 'info',
  usage: '!userinfo [@user]',
  descriptions: "Gets a user's info",
  async execute(message, args) {
    const target = message.mentions.members.first() || message.member;
    const user = await Levels.fetch(target.id, message.guild.id);
    const createdAt = moment(target.user.createdAt).format(
      'D MMM YYYY, h:mm a'
    );
    const joinedAt = moment(target.joinedAt).format('D MMM YYYY, h:mm a');

    const embed = new Discord.MessageEmbed()
      .setColor(target.displayColor)
      .setThumbnail(target.user.displayAvatarURL())
      .addField('**Username**', `**${target.user.username}**`, false)
      .addField('**Account Created**', `**${createdAt}**`, false)
      .addField('**Joined Server**', `**${joinedAt}**`, false)
      .addField('**EXP Level**', `**${user.level || 0}**`)
      .addField(
        '**Jamper Rank**',
        `**${message.member.roles.cache
          .filter((x) => /J[au]mper/.test(x.name))
          .map((r) => r.name)
          .join('')}**`,
        false
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
