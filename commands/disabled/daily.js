const Levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');
const { getDifferenceInDHMS, getRandomInt } = require('../../utils/functions');

module.exports = {
  name: 'daily',
  setLevel: 5,
  category: 'EXP',
  disabled: true,
  usage: '!daily',
  description: 'Collect a daily amount of EXP',
  async execute(message, args) {
    var user = Levels.fetch(message.author.id, message.guild.id);
    if (!user.streak) user.streak = 0;
    if (user.lastDaily) {
      if (getDifferenceInDHMS(user.lastDaily, new Date(), 'hour') < 24) {
        return message.channel.send(
          `You've already used this command today! Please wait **${Math.round(
            getDifferenceInDHMS(
              24,
              getDifferenceInDHMS(user.lastDaily, new Date(), 'hour'),
              'hour'
            )
          )} hours** and **${Math.round(
            getDifferenceInDHMS(
              24,
              getDifferenceInDHMS(user.lastDaily, new Date(), 'hour'),
              'hour'
            ) / 60
          )} minutes**`
        );
      }
      // eslint-disable-next-line no-unused-expressions
      getDifferenceInDHMS(user.lastDaily, new Date(), 'hour') < 48
        ? (user.streak += 1)
        : (user.streak = 0);
    }

    const amount = getRandomInt(200, 350) + user.streak * 30;
    const up = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      amount
    );
    const daily = new MessageEmbed()
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
