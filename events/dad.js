const whiteChannels = require('../data/whiteChannels.json');

module.exports = async (message) => {
  // this function only works in general channels (in this case, the whitelisted channels), to prevent unneeded spam
  if (!whiteChannels.includes(message.channel.id)) return;

  // if the function was triggered by a bot, cancel. Jampbot will say "I'm Jampbot++" in it's response, which would cause an infinite loop
  if (message.author.bot) return;

  // as an extra step to avoid unneeded spam and annoyance, I set the function to only fully trigger 20% of the time
  const dadChance = Math.random();

  // if the 5% chance is successful...
  if (dadChance <= 0.05) {
    const str = message.content;

    const modified = str
      .toLowerCase()
      .replace(/i am/g, 'im')
      .replace(/[^a-z\.\?\! ]/g, '')
      .split(/\.|\?|\!/)
      .map((i) => {
        i = ` ${i}`;
        const start = i.indexOf(' im ');
        if (start === -1) {
          return;
        }
        return i.substr(start);
      })
      .filter((i) => i)
      .join(' and ');

    let start;
    if (modified) {
      message.channel.send(
        `Hi ${modified
          .substr(start)
          .split(' im ')
          .map((i) => i.trim())
          .filter((i) => i)
          .join(' ')}, I'm Jampbot++!`
      );
    }
  }
};
