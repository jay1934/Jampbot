module.exports = {
  name: 'promote',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("You didn't mention a user!");
    const xp = parseInt(args[1]);
    if (!xp)
      return message.channel.send(
        "You didn't specify how many EXP levels to award!"
      );
    require('discord-xp')
      .appendLevel(message.author.id, message.guild.id, xp)
      .then(() =>
        message.channel.send(
          `**${xp} Levels** have been awarded to **${
            user.username
          }** ${message.guild.emojis.cache.find(
            (emoji) => emoji.name === 'PikaPls'
          )}`
        )
      )
      .catch(console.error);
  },
};
