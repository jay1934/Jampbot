module.exports = async (member) => {
  const { username, guild, id, roles, user } = member;
  require('../models/guilds').findOne(
    {
      GuildID: guild.id,
    },
    (err, data) => {
      if (err) throw err;
      if (!data || !data.Welcome) return;
      guild.channels.cache
        .get(data.Welcome)
        .send(
          `Hey <@${id}>, welcome to **${guild.name}!**${
            guild.id === '699220238801174558'
              ? `\n\n**To gain access to the rest of the discord, please read <#699220667484078131> and agree to the message near the bottom**\n\nHave a great time and remember to contact a mod with any questions <a:PogJamper:704670075667611648> <a:PogJamper:704670075667611648> <a:PogJamper:704670075667611648>`
              : ''
          }`
        );
      if (guild.id === '741792628609253377' && member.bot) {
        require('../models/botter').findOne({ BotID: id }, (err, res) => {
          if (err) throw err;
          if (!res) return roles.add('741792628609253383');
          if (!guild.members.cache.has(res.UserID)) {
            if (data.Log)
              guild.channels.cache
                .get(data.Log)
                .send(
                  `The bot ${user.tag} joined, but it's owner is no longer in the Discord, so the bot was kicked.`
                );
            member.kick({ reason: 'Owner was not still in the guild' });
          }
          roles.add('741792628609253378');
          member.setNickname(`[${res.prefix}] ${username}`);
        });
        if (roles.cache.has('741797768825143296'))
          roles.remove('741792628609253383');
        else
          setTimeout(() => {
            if (roles.cache.has('741797768825143296'))
              roles.remove('741792628609253383');
            else
              guild.channels.cache
                .get(data.Log)
                .send(
                  `**${user.tag}** is a bot, but wasn't given the \`Unverified\` role in time `
                );
          }, 5000);
      }
    }
  );
};
