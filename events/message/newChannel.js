const botter = require('../../models/botter');

module.exports = async (message) => {
  if (message.channel.id !== '745440162787622992' || message.author.bot) return;
  const args = message.content.split(/ +/);
  const error = (message, error) =>
    message.channel.send(error).then((err) => err.delete({ timeout: 5000 }));

  message.delete();
  if (!/<@[&!]?\d+>/.test(args[1]))
    return error(
      message,
      'Please respond in the following format: `channel-name(one word only) @your-bot`.'
    );
  if (args[0].length > 20)
    return error(
      message,
      'Please make your channel name 20 characters or less.'
    );

  const bot = message.mentions.users.first();
  if (!bot.bot) return error(message, `**${bot.username}** is not a bot!`);
  botter.findOne({ BotID: bot.id }, (err, data) => {
    if (err) {
      console.log(err);
      return error(message, 'Something went wrong.');
    }
    if (!data)
      return error(message, 'You can not create a channel for this bot');
    if (data.UserID !== message.author.id)
      return error(message, "You don't own this bot!");
    if (!data.Accepted)
      return error(message, "This bot hasn't been accepted yet!");
    if (bot.hasChannel)
      return error(message, 'This bot already has a channel!');

    message.guild.channels
      .create(args[0], {
        topic: `${bot.username}'s testing channel`,
        parent: '745784271221817456',
        permissionOverwrites: [
          {
            id: message.author.id,
            allow: ['MANAGE_MESSAGES', 'MANAGE_WEBHOOKS'],
          },
          {
            id: bot.id,
            allow: ['MANAGE_MESSAGES', 'MANAGE_WEBHOOKS'],
          },
          {
            id: message.guild.id,
            deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
          },
          {
            id: '741797768825143296',
            deny: ['VIEW_CHANNEL'],
          },
        ],
      })
      .then((channel) => {
        error(message, `${channel} has been created!`);
        message.client.channels.cache
          .get('745787042478292993')
          .send(
            `${channel} has been created for ${bot.tag}, ${message.author.tag}'s bot!`
          );
        channel.send(
          `${message.author}, welcome to your private testing channel!`
        );
      });
    data.hasChannel = true;
    data.save();
  });
};
