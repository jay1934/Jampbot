const { fetch, xpFor } = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'levels',
  category: 'EXP',
  usage: '!levels',
  description: 'Shows next five EXP levels',
  async execute(message) {
    const user = await fetch(message.author.id, message.guild.id);

    const data = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor(`You are level ${user.level} with ${user.xp} EXP points.`)
      .setTitle('Next Five Levels:');
    for (var i = 1; i <= 5; i++)
      data.addField(`Level ${user.level + i}`, `${xpFor(user.level + i)} EXP`);
    message.channel.send(data);
  },
};
