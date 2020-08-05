const Levels = require('discord-xp');
const { getEmoji } = require('../../utils/functions');

module.exports = {
  name: 'addxp',
  aliases: ['addexp'],
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("You didn't mention a user!");
    const xp = parseFloat(args[1]);
    if (!xp)
      return message.channel.send(
        "You didn't specify an amount of EXP to add!"
      );
    Levels.appendXp(user.id, message.guild.id, xp)
      .then(() =>
        message.channel.send(
          `**${xp} EXP** points have been added to **${
            user.username
          }** ${getEmoji('PikaPls', message.client)}`
        )
      )
      .catch((err) => console.log(err));
  },
};
