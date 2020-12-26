const { fetch, appendXp } = require('discord-xp');

module.exports = {
  name: 'daily',
  setLevel: 5,
  category: 'EXP',
  usage: '!daily',
  disabled: true,
  description: 'Collect a daily amount of EXP',
  async execute(message) {
    var user = await fetch(message.author.id, message.guild.id);
    if (!user.streak) user.streak = 0;
    if (user.lastDaily) {
      if (Math.getDifferenceInDHMS(user.lastDaily, new Date(), 'hour') < 24) {
        return message.channel.send(
          `You've already used this command today! Please wait **${Math.round(
            Math.getDifferenceInDHMS(
              24,
              Math.getDifferenceInDHMS(user.lastDaily, new Date(), 'hour'),
              'hour'
            )
          )} hours** and **${Math.round(
            Math.getDifferenceInDHMS(
              24,
              Math.getDifferenceInDHMS(user.lastDaily, new Date(), 'hour'),
              'hour'
            ) / 60
          )} minutes**`
        );
      }
      // eslint-disable-next-line no-unused-expressions
      Math.getDifferenceInDHMS(user.lastDaily, new Date(), 'hour') < 48
        ? user.streak++
        : (user.streak = 0);
    }

    const amount = Math.inRange(200, 350) + user.streak * 30;
    const up = await appendXp(message.author.id, message.guild.id, amount);
    const daily = new (require('discord.js').MessageEmbed)()
      .setColor('GREEN')
      .setAuthor(`Streak: ${user.streak} (+${user.streak * 30} bonus)`)
      .setTitle('Daily Reward Collected!')
      .setDescription(
        `**${amount} EXP points** were placed in your account. Jamp on <a:PogJamper:704670075667611648>`
      );
    if (up)
      daily.addField('Level Up', `You leveled up to level **${user.level}**!`);
    message.channel.send(daily);
    user.lastDaily = new Date();
  },
};
