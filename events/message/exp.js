const Levels = require('discord-xp');
const moment = require('moment');
const levels = require('../../models/levels');
const guilds = require('../../models/guilds');

const newTimeCounter = new Set();
module.exports = async (message) => {
  if (!message.guild) return;
  const data = await guilds.findOne({
    GuildID: message.guild.id,
  });
  // do not give exp if:
  if (
    message.author.bot || // bots can't gain exp
    message.channel.parentID === '701852801646723302' || // if channel category is jampbot (bot-spam, level-submission, and level-updates)
    /699612856018272289|699230720392167482|701597700621074513/.test(
      message.channel.id
    ) || // if channel is quaglad-spam, jampbot-dev and mod-stuff
    message.content.startsWith('!') || // if message is command commands
    message.content.replace(/<a?:\w+:\d+>/, ' ').length < 10 || // if message is under 10 characters
    newTimeCounter.has(message.author.id) || // if user already gained exp that minute
    !data.EXP
  )
    return;
  var multi = 0,
    level;
  await levels.findOneAndUpdate(
    { userID: message.author.id, guildID: message.guild.id },
    {
      boosted: {
        bool: message.member.roles.cache.has('702529904188719165'),
        multi: 2,
      },
      pog: {
        bool: message.member.roles.cache.some((r) =>
          r.name.endsWith('PogJamper')
        ),
        multi: 1.5,
      },
      jamper: {
        bool: message.member.roles.cache.has('699221309237755905'),
        multi: 1.2,
      },
      early: {
        bool: !!(
          moment(message.member.joinedAt).format('D MMM YYYY') === '13 Apr 2020'
        ),
        multi: 1.5,
      },
    },
    (err, user) => {
      if (err) throw err;
      if (user) {
        user.lastUpdated = new Date();
        if (user.boosted.bool) multi += user.boosted.multi;
        if (user.pog.bool) multi += user.pog.multi;
        if (user.jamper.bool) multi += user.jamper.multi;
        if (user.early.bool) multi += user.early.multi;
        if (user.rep) multi += user.rep / 1000 + 1;
        level = user.level;
        user.save();
      }
    }
  );
  multi = multi < 1 ? 1 : multi;
  newTimeCounter.add(message.author.id);
  var randomAmountOfXp = Math.inRange(1, 30) * Math.round(multi);
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomAmountOfXp
  );
  if (hasLeveledUp) {
    message.channel.send(
      `Congratulations <@${
        message.author.id
      }>! You have leveled up to **level ${
        level + 1
      }** <:JuzHype:717925533265952832>`
    );
  }

  setTimeout(() => {
    newTimeCounter.delete(message.author.id);
  }, 60000);
};
