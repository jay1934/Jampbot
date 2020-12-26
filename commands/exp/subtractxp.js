module.exports = {
  name: 'subtractxp',
  aliases: ['subtractexp', 'subxp', 'subexp'],
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("You didn't mention a user!");
    const xp = parseInt(args[1]);
    if (!xp)
      return message.channel.send(
        "You didn't specify an amount of EXP to subtract!"
      );
    require('discord-xp')
      .subtractXp(user.id, message.guild.id, xp)
      .then(() =>
        message.channel.send(
          `**${xp} EXP** points have been subtracted from **${
            user.username
          }** ${message.guild.emojis.cache.find(
            (emoji) => emoji.name === 'SadPog'
          )}`
        )
      )
      .catch(console.error);
  },
};
