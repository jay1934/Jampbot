const Discord = require('discord.js');
const moment = require('moment');
const func = require('../utils/functions.js');

module.exports = {
  name: 'userinfo',
  aliases: ['uinfo'],
  blacklist: true,
  guildOnly: true,
  async execute(message, args) {
    const target = message.mentions.members.first() || message.member;
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
      .setTimestamp();

    if (func.hasRole(target, 'Jumper')) {
      embed.addField('Jamper Rank', '**Jumper**', false);
    } else if (func.hasRole(target, 'Rookie Jamper')) {
      embed.addField('Jamper Rank', '**Rookie Jamper**', false);
    } else if (func.hasRole(target, 'Amateur Jamper')) {
      embed.addField('Jamper Rank', '**Amateur Jamper**', false);
    } else if (func.hasRole(target, 'Trained Jamper')) {
      embed.addField('Jamper Rank', '**Trained Jamper**', false);
    } else if (func.hasRole(target, 'Experienced Jamper')) {
      embed.addField('Jamper Rank', '**Experienced Jamper**', false);
    } else if (func.hasRole(target, 'Pro Jamper')) {
      embed.addField('Jamper Rank', '**Pro Jamper**', false);
    } else if (func.hasRole(target, 'Master Jamper')) {
      embed.addField('Jamper Rank', '**Master Jamper**', false);
    } else if (func.hasRole(target, 'Elite Jamper')) {
      embed.addField('Jamper Rank', '**Elite Jamper**', false);
    } else if (func.hasRole(target, 'Divine Jamper')) {
      embed.addField('Jamper Rank', '**Divine Jamper**', false);
    } else if (func.hasRole(target, 'Eternal Jamper')) {
      embed.addField('Jamper Rank', '**Eternal Jamper**', false);
    } else if (func.hasRole(target, 'PogJamper')) {
      embed.addField('Jamper Rank', '**PogJamper**', false);
    } else if (func.hasRole(target, 'Almighty PogJamper')) {
      embed.addField('Jamper Rank', '**Almighty PogJamper**', false);
    } else {
      embed.addField('Jamper Rank', '**Unranked**', false);
    }

    message.channel.send(embed);
  },
};
