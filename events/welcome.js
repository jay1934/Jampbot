const { getChannel, getGuild, hasRole } = require('../utils/functions');

module.exports = async (member) => {
  const data = require('../models/guilds').findOne(
    {
      GuildID: member.guild.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data || !data.Welcome) return;
      member.client.channels.cache
        .get(data.Welcome)
        .send(
          `Hey ${member}, welcome to **${member.guild.name}!**${
            member.guild.id === 699220238801174558
              ? `\n\n**To gain access to the rest of the discord, please read <#699220667484078131> and agree to the message near the bottom**\n\nHave a great time and remember to contact a mod with any questions <a:PogJamper:704670075667611648> <a:PogJamper:704670075667611648> <a:PogJamper:704670075667611648>`
              : ''
          }`
        );
      if (member.guild.id === '741792628609253377' && member.bot) {
        require('../models/botter').findOne(
          { BotID: member.id },
          (err, res) => {
            if (err) return console.log(err);
            if (!res)
              return member.roles.add(
                member.client.roles.cache.get('741792628609253383')
              );
            const user = member.guild.members.cache.get(res.UserID);
            if (!user) {
              if (data.Log)
                member.client.channels.cache
                  .get(data.Log)
                  .send(
                    `The bot ${member.tag} joined, but it's owner is no longer in the Discord, so the bot was kicked.`
                  );
              member.kick({ reason: 'Owner was not still in the guild' });
            }
            member.roles.add(
              member.client.roles.cache.get('741792628609253378')
            );
            member.setNickname(`[${res.prefix}] ${member.username}`);
          }
        );
        if (hasRole(member, '741797768825143296'))
          member.roles.remove(
            member.client.roles.cache.get('741792628609253383')
          );
        else
          setTimeout(() => {
            if (hasRole(member, '741797768825143296'))
              member.roles.remove(
                member.client.roles.cache.get('741792628609253383')
              );
            else
              member.client.channels.cache
                .get(data.Log)
                .send(
                  `**${member}** is a bot, but wasn't given the \`Unverified\` role in time `
                );
          }, 5000);
      }
    }
  );
};
