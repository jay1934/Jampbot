const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'giveaway',
  ownerOnly: true,
  guildOnly: true,
  disabled: true,
  async execute(message, args) {
    const time = args[0];
    if (!time) return message.channel.send(`❌ You did not specify your time!`);
    if (
      (!time.endsWith('d') &&
        !time.endsWith('h') &&
        !time.endsWith('m') &&
        !time.endsWith('s')) ||
      time <= 0
    )
      return message.channel.send(
        `❌ You did not use the correct formatting for the time!`
      );
    const prize = args.slice(1).join(' ');
    if (!prize) return message.channel.send(`❌ No prize specified!`);
    const Embed = new MessageEmbed()
      .setTitle(`🎉🎉 New giveaway! 🎉🎉`)
      .setDescription(
        `A giveaway has been started for the prize of **${prize}!**\nThe giveaway will end in **${ms(
          ms(time),
          {
            long: true,
          }
        )}!**`
      )
      .setTimestamp()
      .setColor(`GREEN`);
    const m = await message.channel.send(Embed);
    m.react('🎉');
    setTimeout(() => {
      if (m.reactions.cache.get('🎉').count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get('🎉').count}`);
        return message.channel.send(
          `❌ Not enough people reacted for me to start draw a winner!`
        );
      }

      const winner = m.reactions.cache
        .get('🎉')
        .users.cache.filter((u) => !u.bot)
        .random();
      const winnerE = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('🎉🎉 A winner has been chosen 🎉🎉')
        .setDescription(
          `The winner of the giveaway for **${prize}** is... ${winner}! Congrats!`
        )
        .setFooter('Please DM @Lioness100#4566 to claim your prize')
        .setThumbnail(
          'https://cdn.discordapp.com/emojis/717925533265952832.png?v=1'
        );

      message.channel.send({ embed: winnerE });
    }, ms(time));
  },
};
