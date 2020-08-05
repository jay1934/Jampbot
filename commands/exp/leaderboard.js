const Levels = require('discord-xp');

module.exports = {
  name: 'leaderboard',
  category: 'EXP',
  usage: '!leaderboard',
  blacklist: true,
  description: 'Shows guildXPleaderboard.',
  async execute(message, args) {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    const leaderboard = Levels.computeLeaderboard(
      message.client,
      rawLeaderboard
    );

    const lb = leaderboard.map(
      (e) =>
        `**${e.position}.** ${e.username}#${e.discriminator}\n**Level:** \`\`${
          e.level
        }\`\`\n**XP:** \`\`${e.xp.toLocaleString()}\`\``
    );

    message.channel.send(`**EXP Leaderboard**:\n\n${lb.join('\n\n')}`);
  },
};
