const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'warn',
  modOnly: true,
  guildOnly: true,
  category: 'moderation',
  usage: '!warn @user <warn message>',
  descriptions: 'Warns a user',
  async execute(message, args) {
    const warns = require('../../models/warns');
    const user = message.mentions.users.first();
    if (!user)
      return message.channel.send(
        `❌ You did not mention a user.\nCorrect usage: \`\`${this.usage}\`\``
      );
    if (!args.slice(1).join(' '))
      return message.channel.send(
        `❌ You did not specify a reason.\nCorrect usage: \`\`${this.usage}\`\``
      );
    const warnEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setThumbnail(config.thumbnails.sad)
      .setDescription(`✅ **${user.username}** has been successfully warned!`)
      .addField('Moderator:', message.author.username)
      .addField('Warning:', args.slice(1).join(' '));
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          const newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(' '),
              },
            ],
          });
          newWarns.save();
          warnEmbed.setFooter(`This is ${user.username}'s first warning`);
          message.channel.send(warnEmbed);
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(' '),
          });
          data.save();
          warnEmbed.setFooter(
            `${user.username} now has ${data.Warns.length} warnings`
          );
          message.channel.send(
            `**${
              user.username
            }** has been warned with the reason of:\n**${args
              .slice(1)
              .join(' ')}**\nThey now have ${data.Warns.length} warns.`
          );
        }
      }
    );
  },
};
