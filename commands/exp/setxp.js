module.exports = {
  name: 'setxp',
  aliases: ['setexp'],
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("You didn't mention a user!");
    const xp = parseInt(args[1]);
    if (!xp)
      return message.channel.send("You didn't specify an amount of EXP!");
    require('discord-xp')
      .setXp(user.id, message.guild.id, xp)
      .then(() =>
        message.channel.send(
          `**${user.username}** now has **${xp} EXP** points.`
        )
      )
      .catch(console.error);
  },
};
