module.exports = {
  name: 'rejectbot',
  helpIgnore: true,
  modOnly: true,
  async execute(message, args) {
    if (!args[0])
      return message.channel.send('Please specify a bot ID to reject.');
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason provided';
    const bot = await message.client.users.fetch(args[0], false, true);
    if (!bot) return message.channel.send('This is not a valid ID.');
    if (!bot.bot) return message.channel.send('This user is not a bot.');
    require('../../models/botter').findOne({ BotID: bot.id }, (err, data) => {
      if (err) throw err;
      if (!data) return message.channel.send("You can't reject this bot!");
      message.client.channels.cache
        .get('745787042478292993')
        .send(
          `<@${bot.id}>, ${
            message.client.users.cache.get(data.UserID).tag
          }'s bot, has been rejected <:NotLikeThis:717575061468610560>`
        );
      message.client.users.cache
        .get()
        .send(
          `Your bot, ${bot.tag}, was rejected from **Bot Playground**...\n\nReason:\n${reason}`
        );
    });
  },
};
