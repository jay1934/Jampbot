const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
  name: 'levels',
  category: 'EXP',
  usage: '!levels',
  description: 'Shows next five EXP levels',
  async execute(message, args) {
    const user = await Levels.fetch(message.author.id, message.guild.id);

    const data = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setAuthor(`You are level ${user.level} with ${user.xp} EXP points.`)
      .setTitle('Next Five Levels:');
    for (var i = 1; i <= 5; i++)
      data.addField(
        `Level ${user.level + i}`,
        `${Levels.xpFor(user.level + i)} EXP`
      );
    message.channel.send(data);
  },
};
