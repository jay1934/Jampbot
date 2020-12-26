module.exports = {
  name: 'approvebot',
  helpIgnore: true,
  modOnly: true,
  async execute(message, args) {
    if (!args[0])
      return message.channel.send('Please specify a bot ID to approve.');
    const bot = await message.client.users.fetch(args[0], false, true);
    if (!bot) return message.channel.send('This is not a valid ID.');
    if (!bot.bot) return message.channel.send('This user is not a bot.');
    require('../../models/botter').findOne({ BotID: bot.id }, (err, data) => {
      if (err) throw err;
      if (!data) return message.channel.send("You can't accept this bot!");
      data.Approved = true;
      message.client.channels.cache
        .get('745787042478292993')
        .send(
          `<@${bot.id}>, ${
            message.client.users.cache.get(data.UserID).tag
          }'s bot, has been accepted to the server!`
        );
      message.client.users.cache
        .get(data.UserID)
        .send(`Your bot, ${bot.tag}, was accepted into **Bot Playground**!`);
    });
  },
};
