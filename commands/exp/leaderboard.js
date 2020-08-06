const Levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'leaderboard',
  category: 'EXP',
  usage: '!leaderboard',
  aliases: ['lb'],
  blacklist: true,
  description: 'Shows guildXPleaderboard.',
  async execute(message, args) {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    const leaderboard = Levels.computeLeaderboard(
      message.client,
      rawLeaderboard
    );

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
    /* const lb = leaderboard.map(
      (e) =>
        `**${e.position}.** ${e.username}#${e.discriminator}\n**Level:** \`\`${
          e.level
        }\`\`\n**XP:** \`\`${e.xp.toLocaleString()}\`\``
    ); */

    // message.channel.send(`**EXP Leaderboard**:\n\n${lb.join('\n\n')}`);
    message.channel.send(data);
  },
};
