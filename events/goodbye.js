const Discord = require('discord.js');
const { getChannel } = require('../utils/functions');
const config = require('../config.json');

module.exports = (member) => {
  // make an embed
  const memberLeave = new Discord.MessageEmbed()
    .setTitle(
      `:outbox_tray: **${member.user.username}#${member.user.discriminator}** left the server`
    )
    .setDescription(
      `They just weren't as enthusiastic 
about Jamping as you and I <:crii:715617335754621000>`
    )
    .setThumbnail(
      'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
    )
    .setFooter('Big RIP');

  // send the embed in mod logs
  getChannel(config.channelID.modlog, member.client).send({
    embed: memberLeave,
  });
};
