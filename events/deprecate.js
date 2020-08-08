const levels = require('../models/levels');
const { getChannel, getUser, getGuild } = require('../utils/functions');

module.exports = (client) => {
  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }
  console.log('schedule function workes');
  const toBePurged = levels
    .find({
      lastUpdated: {
        $lt: addMonths(new Date(), -3),
      },
    })
    .then((res) => {
      if (res) {
        res.forEach((res) => {
          if (getGuild('Team Jamp', client).member(res.UserID))
            getChannel('mod-stuff', client).send(
              `**${getUser(res.UserID, client).username}#${
                getUser(res.UserID, client).discriminator
              }**'s EXP was just reset after 3 months of inactivity (they had ${
                res.xp
              } EXP)`
            );
        });
      }
    });

  levels
    .deleteMany({
      lastUpdated: {
        $lt: addMonths(new Date(), -3),
      },
    })
    .then((err) => console.log(`There was an error purging user: ${err}`));
};
