const Levels = require('discord-xp');
const { progressbar } = require('discord.js-utility');

module.exports = {
  name: 'exp',
  aliases: ['xp'],
  category: 'EXP',
  usage: '!exp [@user]',
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

    const bar = progressbar(user.xp, Levels.xpFor(user.level + 1), 15, [
      '<:green:740590536343158844>',
      '<:red:740591576505385050>',
    ]);

    if (!user)
      return message.channel.send(
        `**${target.username}** hasn't earned any xp so far <:SadPog:710543485849174067>`
      );
    if (target.id !== message.author.id)
      message.channel.send(
        `**${target.username}** is currently **Level ${
          user.level
        }**, and **Rank ${leaderboard
          .filter((u) => u.userID === target.id)
          .map(
            (u) => u.position
          )}** on the leaderboar <:PikaPls:718985469337010206>`
      );
    else
      message.channel.send(
        `You are currently **Level ${
          user.level
        }**, and **Rank ${leaderboard
          .filter((u) => u.userID === target.id)
          .map(
            (u) => u.position
          )}** on the leaderboard <:PikaPls:718985469337010206>\nYou have **${
          user.xp
        } XP** points and need **${
          Levels.xpFor(user.level + 1) - user.xp
        }** more to level up!\n\n**Progress Bar (To Next Level):**\n${bar}`
      );
  },
};
