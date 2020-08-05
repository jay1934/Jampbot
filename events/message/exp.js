const Levels = require('discord-xp');
const { getRandomInt, hasRole } = require('../../utils/functions');

const newTimeCounter = new Set();
module.exports = async (message) => {
  if (
    message.author.bot || // bots
    message.channel.parentID === '701852801646723302' || // jampbot
    /699612856018272289|699230720392167482|701597700621074513/.test(
      message.channel.id
    ) || // quaglad-spam, jampbot-dev and mod-stuff
    message.content.startsWith('!') || // commands
    message.content.length < 10 || // really short messages
    newTimeCounter.has(message.author.id) // max once per minute
  )
    return;

  newTimeCounter.add(message.author.id);

  var randomAmountOfXp = hasRole(message.member, 'True Homie')
    ? getRandomInt(1, 30) * 2
    : getRandomInt(1, 30); // Min 1, Max 30

  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomAmountOfXp
  );
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(
      `Congratulations <@${message.author.id}>! You have leveled up to **level ${user.level}** <:JuzHype:717925533265952832>`
    );
  }
  setTimeout(() => {
    newTimeCounter.delete(message.author.id);
  }, 60000);
};
