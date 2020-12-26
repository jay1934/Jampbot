module.exports = {
  name: 'addxp',
  aliases: ['addexp'],
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("You didn't mention a user!");
    const xp = parseInt(args[1]);
    if (!xp)
      return message.channel.send(
        "You didn't specify an amount of EXP to add!"
      );
    require('discord-xp')
      .appendXp(user.id, message.guild.id, xp)
      .then((bool) =>
        message.channel.send(
          `**${xp} EXP** points have been added to **${user.username}** ${
            bool ? 'and they leveled up!' : ''
          } ${message.guild.emojis.cache.find(
            (emoji) => emoji.name === 'PikaPls'
          )}`
        )
      )
      .catch(console.error);
  },
};
