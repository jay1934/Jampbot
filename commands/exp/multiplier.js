const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'multiplier',
  category: 'EXP',
  aliases: ['multi', 'multis', 'multipliers'],
  usage: '!multiplier',
  description: 'View your EXP multiplier(s)',
  blacklist: true,
  async execute(message) {
    const user = await require('discord-xp').fetch(
      message.author.id,
      message.guild.id
    );
    var active = [];
    if (!user) {
      message.channel.send("You don't have any exp yet!");
    } else {
      if (user.boosted.bool)
        active.push(
          `**Server Booster:** ${
            ((user.boosted.multi - 1) / 1) * 100
          }% EXP Bonus`
        );

      if (user.pog.bool)
        active.push(
          `**PogJamper:** ${((user.pog.multi - 1) / 1) * 100}% EXP Bonus`
        );

      if (user.jamper.bool)
        active.push(`**Part of the Jamp Squad:** 20% EXP Bonus`);

      if (user.early.bool)
        active.push(
          `**Day 1 Jamper:** ${((user.early.multi - 1) / 1) * 100}% EXP Bonus`
        );

      if (user.rep > 0)
        active.push(
          `**${user.rep} Reputation:** ${(user.rep / 1000) * 100}% EXP Bonus`
        );
      const data = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Active EXP Multipliers');

      if (active[0]) {
        data.addField('Your Multiplier(s)', active.join('\n'));
      } else {
        data.setDescription(
          "You don't have any active multipliers <:SadBowser:717925128331329607>"
        );
      }
      data.setFooter(
        `You have discovered ${active.length} of the current 5 available multipliers.`
      );
      message.channel.send(data);
    }
  },
};
