module.exports = {
  name: 'xpinfo',
  category: 'EXP',
  usage: '!xpinfo',
  description: 'Displays XP information',
  async execute(message, args) {
    message.channel.send(
      'You can earn XP by participating in conversations! You will get 1-30 XP every message sent (some channels are excluded). **Server Boosters get a 2x EXP multiplier!**\n\nTry ``!level`` and ``!leaderboard``!'
    );
  },
};
