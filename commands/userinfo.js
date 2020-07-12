const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['uinfo'],
  blacklist: true,
  guildOnly: true,
  async execute(message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
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

    if (target.roles.cache.has('703287854226473021')) {
      embed.addField('Jamper Rank', '**Jumper**', false);
    } else if (target.roles.cache.has('699581332065353779')) {
      embed.addField('Jamper Rank', '**Rookie Jamper**', false);
    } else if (target.roles.cache.has('699581483471601806')) {
      embed.addField('Jamper Rank', '**Amateur Jamper**', false);
    } else if (target.roles.cache.has('699581657300336750')) {
      embed.addField('Jamper Rank', '**Trained Jamper**', false);
    } else if (target.roles.cache.has('699581735008075786')) {
      embed.addField('Jamper Rank', '**Experienced Jamper**', false);
    } else if (target.roles.cache.has('699581842847826018')) {
      embed.addField('Jamper Rank', '**Pro Jamper**', false);
    } else if (target.roles.cache.has('699582010833764373')) {
      embed.addField('Jamper Rank', '**Master Jamper**', false);
    } else if (target.roles.cache.has('703291564608454676')) {
      embed.addField('Jamper Rank', '**Elite Jamper**', false);
    } else if (target.roles.cache.has('703286855587725332')) {
      embed.addField('Jamper Rank', '**Divine Jamper**', false);
    } else if (target.roles.cache.has('703292006440370197')) {
      embed.addField('Jamper Rank', '**Eternal Jamper**', false);
    } else if (target.roles.cache.has('699582087598047372')) {
      embed.addField('Jamper Rank', '**PogJamper**', false);
    } else if (target.roles.cache.has('703321161177628783')) {
      embed.addField('Jamper Rank', '**Almighty PogJamper**', false);
    } else {
      embed.addField('Jamper Rank', '**Unranked**', false);
    }

    message.channel.send(embed);
  },
};
