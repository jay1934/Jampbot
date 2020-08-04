const Levels = require('discord-xp');

module.exports = {
  name: 'level',
  category: 'EXP',
  usage: '!rank [@user]',
  blacklist: true,
  description: 'Displays your XP rank or the XP rank of another user.',
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;

    const user = await Levels.fetch(target.id, message.guild.id);

    const rawLeaderboard = await Levels.fetchLeaderboard(
      message.guild.id,
      1000
    ); // We grab top 10 users with most xp in the current server.
    const leaderboard = Levels.computeLeaderboard(
      message.client,
      rawLeaderboard
    );

    if (!user)
      return message.channel.send(
        `**${target.username}** hasn't earned any xp so far <:SadPog:710543485849174067>`
      );
    if (target.id !== message.author.id)
      message.channel.send(
        `**${target.username}** is currently **level ${user.level}** <:PikaPls:718985469337010206>`
      );
    else
      message.channel.send(
        `You are currently **Level ${
          user.level
        }**, and **Rank ${leaderboard
          .filter((u) => u.userID === target.id)
          .map(
            (u) => u.position
          )}** on the leaderboard <:PikaPls:718985469337010206>\nYou need ${
          Levels.xpFor(user.level + 1) - user.xp
        } more XP points to level up!`
      );
  },
};
