const levels = require('../models/levels');
const guilds = require('../models/guilds');

module.exports = (client) => {
  levels.find(
    {
      lastUpdated: {
        $lt: new Date().setMonth(new Date().getMonth() - 3),
      },
    },
    (err, results) => {
      if (err) throw err;
      if (results) {
        results.forEach(({ guildID, userID, xp }) => {
          if (client.guilds.cache.get(guildID).member(userID))
            guilds.findOne({ GuildID: guildID }, (err, data) => {
              if (err) throw err;
              if (!data || !data.Log) return;
              client.users.fetch(userID).then((user) => {
                client.channels.cache
                  .get(data.Log)
                  .send(
                    `**${user.tag}**'s EXP was just reset after 3 months of inactivity (they had ${xp} EXP)`
                  );
              });
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
    (err) => {
      if (err) throw err;
    }
  );

  levels.find(
    {
      lastUpdated: { $lt: new Date().setDate(new Date().getDate() - 7) },
    },
    (err, users) => {
      if (err) throw err;
      if (users) {
        users.forEach((user) => {
          if (
            !client.guilds.cache.get(user.guildID).member(user.userID) ||
            user.xp < 400 ||
            new Date(user.lasUpdated) <
              new Date().setDate(new Date().getDate() - 7)
          )
            return;
          guilds.findOne({ GuildID: user.guildID }, (err, data) => {
            if (err) throw err;
            if (!data || !data.Log) return;
            client.users.fetch(user.userID).then((user) => {
              client.channels.cache
                .get(data.Log)
                .send(
                  `**${user.tag}**'s EXP was lowered ${Math.floor(
                    (300 / user.xp) * 100
                  )}% (300 EXP points) after one week of inactivity`
                );
            });
          });
          console.log(`Deprecate (Before): ${user.xp}`);
          user.xp -= 300;
          console.log(`LastUpdated (from deprecate) ${user.lastUpdated}`);
          user.lastUpdated = new Date();
          user.save();
        });
      }
    }
  );
};
