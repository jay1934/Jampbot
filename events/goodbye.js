const Discord = require('discord.js');
const botter = require('../models/botter');
const { getChannel, getGuild } = require('../utils/functions');
const config = require('../config.json');

module.exports = (member) => {
  if (member.guild.id === getGuild('Team Jamp', member.client).id) {
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
    require('../models/guilds').findOne(
      { GuildID: member.guild.id },
      (err, data) => {
        if (data && data.Log)
          member.client.channels.cache.get(data.Log).send(memberLeave);
      }
    );
    if (member.bot);
    botter.findOneAndDelete({ BotID: member.id });
  }
};
