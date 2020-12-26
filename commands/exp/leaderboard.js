const { fetchLeaderboard, computeLeaderboard } = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'leaderboard',
  category: 'EXP',
  usage: '!leaderboard',
  aliases: ['lb'],
  blacklist: true,
  description: 'Shows guildXPleaderboard.',
  async execute(message) {
    const rawLeaderboard = await fetchLeaderboard(message.guild.id, 5);
    const leaderboard = computeLeaderboard(message.client, rawLeaderboard);

    const data = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('EXP Leaderboard')
      .setFooter('Use !exp to see your rank!');
    for (const lb of leaderboard) {
      data.addField(
        `${lb.position}. ${lb.username}#${lb.discriminator}`,
        `**Level:** ${lb.level}\n**EXP:** ${lb.xp.toString()}`
      );
    }
    message.channel.send(data);
  },
};
