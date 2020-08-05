module.exports = {
  name: 'xpinfo',
  aliases: ['expinfo'],
  category: 'EXP',
  usage: '!xpinfo',
  description: 'Displays XP information',
  async execute(message, args) {
    message.channel.send(
      'You can earn XP by participating in conversations! You will get 1-30 XP points every message sent (some channels are excluded) (max **once** per minute). **Server Boosters get a 2x EXP multiplier!**\n\nTry ``!exp``, ``!levels``, and ``!leaderboard``!'
    );
  },
};
