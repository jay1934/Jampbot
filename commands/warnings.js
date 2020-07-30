const Discord = require('discord.js');
const { getUser } = require('../utils/functions');
const config = require('../config.json');

module.exports = {
  name: 'warnings',
  rolePermission: 'Jampolice',
  category: 'moderation',
  usage: '!warnings @user',
  description: "Displays user's warning's in Team Jamp",
  async execute(message, args) {
    const warns = require('../models/warns');
    const user = message.mentions.members.first();
    if (!user) return message.channel.send(`No user specified!`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        const Embed = new Discord.MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}`)
          .setColor('RED')
          .setThumbnail(config.thumbnails.sad)
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `**Warn ${i + 1}.**\n\t**Moderator:** ${
                    getUser(w.Moderator, message).username
                  }\n\t**Reason:** ${w.Reason}`
              ).join('\n\n');
            })
          );
        message.channel.send(Embed);
      }
    );
  },
};
