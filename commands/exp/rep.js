const Levels = require('discord-xp');

module.exports = {
  name: 'rep',
  category: 'EXP',
  usage: '!rep [@user]',
  blacklist: true,
  description: 'View your reputation, or the reputation of another user',
  async execute(message, args, log) {
    const target =
      message.mentions.users.first() ||
      message.client.users.cache.get(args[0]) ||
      message.author;

    const user = await Levels.fetch(target.id, message.guild.id);
    if (target === message.author) {
      if (!user) return message.channel.send("You haven't earned any EXP!");
      if (!user.rep) user.rep = 0;
      message.channel.send(
        `You have **${user.rep}** reputation points! Earn reputation by helping people out!\n\nIf you'd like to award someone who's helped *you* reputation, use \`!thank @user\`\n\n*Use \`!multi\` to see your reputation multiplier*`
      );
    } else {
      if (!user)
        return message.channel.send("This user hasn't earned any EXP!");
      if (!user.rep) user.rep = 0;
      message.channel.send(
        `**${target.username}** has **${user.rep}** reputation points!`
      );
    }
  },
};
