module.exports = ({ guild, user, bot, id }) => {
  require('../models/guilds').findOne({ GuildID: guild.id }, (err, data) => {
    if (data && data.Log)
      guild.channels.cache.get(data.Log).send({
        embed: {
          title: `:outbox_tray: **${user.tag}** left the server`,
          description:
            "They just weren't as enthusiastic about Jamping as you and I <:crii:715617335754621000>",
          thumbnail: {
            url:
              'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png',
          },
          footer: { text: 'Big RIP' },
        },
      });
    if (bot) require('../models/botter').findOneAndDelete({ BotID: id });
  });
};
