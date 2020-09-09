const { MessageEmbed } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
  name: 'multiplier',
  category: 'EXP',
  aliases: ['multi', 'multis', 'multipliers'],
  usage: '!multiplier',
  description: 'View your EXP multiplier(s)',
  blacklist: true,
  async execute(message, args) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    var multi = 0;
    var active = [];
    if (!user) {
      message.channel.send("You don't have any exp yet!");
    } else {
      if (user.boosted.bool) {
        multi += user.boosted.multi;
        active.push(
          `**Server Booster:** ${
            ((user.boosted.multi - 1) / 1) * 100
          }% EXP Bonus`
        );
      }

      if (user.pog.bool) {
        multi += user.pog.multi;
        active.push(
          `**PogJamper:** ${((user.pog.multi - 1) / 1) * 100}% EXP Bonus`
        );
      }

      if (user.jamper.bool) {
        multi += user.jamper.multi;
        active.push(`**Part of the Jamp Squad:** 20% EXP Bonus`);
      }

      if (user.early.bool) {
        multi += user.early.multi;
        active.push(
          `**Day 1 Jamper:** ${((user.early.multi - 1) / 1) * 100}% EXP Bonus`
        );
      }

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
