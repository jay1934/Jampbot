const levels = require('../models/levels');
const guilds = require('../models/guilds');
const { getChannel, getUser, getGuild } = require('../utils/functions');

module.exports = (client) => {
  levels.find(
    {
      lastUpdated: {
        $lt: new Date().setMonth(new Date().getMonth() - 3),
      },
    },
    (err, res) => {
      if (err) console.log(err);
      if (res) {
        res.forEach((res) => {
          if (getGuild(res.guildID, client).member(res.userID))
            guilds.findOne({ GuildID: res.guildID }, (err, data) => {
              if (err) console.log(err);
              if (!data || !data.Log) return;
              client.channels.cache
                .get(data.Log)
                .send(
                  `**${getUser(res.userID, client).username}#${
                    getUser(res.userID, client).discriminator
                  }**'s EXP was just reset after 3 months of inactivity (they had ${
                    res.xp
                  } EXP)`
                );
            });
        });
      }
    }
  );

  levels.deleteMany(
    {
      lastUpdated: {
        $lt: new Date().setMonth(new Date().getMonth() - 3),
      },
    },
    (err, res) => {
      if (err) console.log(err);
    }
  );

  levels.find(
    {
      lastUpdated: { $lt: new Date().setDate(new Date().getDate() - 7) },
    },
    (err, users) => {
      if (err) console.log(err);
      if (users) {
        users.forEach((user) => {
          if (
            !getGuild(user.guildID, client).member(user.userID) ||
            user.xp < 400 ||
            new Date(user.lasUpdated) <
              new Date().setDate(new Date().getDate() - 7)
          )
            return;
          guilds.findOne({ GuildID: user.guildID }, (err, data) => {
            if (err) console.log(err);
            if (!data || !data.Log) return;
            client.channels.cache
              .get(data.Log)
              .send(
                `**${getUser(user.userID, client).username}#${
                  getUser(user.userID, client).discriminator
                }**'s EXP was lowered ${Math.floor(
                  (300 / user.xp) * 100
                )}% (300 EXP points) after one week of inactivity`
              );
          });
          console.log('Deprecate (Before): ', user.xp);
          user.xp -= 300;
          console.log('LastUpdated (from deprecate)', user.lastUpdated);
          user.lastUpdated = new Date();
          user.save();
        });
      }
    }
  );
};
