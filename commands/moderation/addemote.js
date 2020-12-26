module.exports = {
  name: 'addemote',
  category: 'moderation',
  usage: '!addemote <emote URL> <emote name>',
  description: 'Add an emote of your choice to the server',
  modOnly: true,
  async execute(message, args, log) {
    if (!args[0])
      return message.channel.send(
        `Please provide an \`http(s)\` emote URL.\nCorrect usage: \`\`${this.usage}\`\``
      );
    if (!args[1])
      return message.channel.send(
        `Please provide the name of this emote.\nCorrect usage: \`\`${this.usage}\`\``
      );
    if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        args[0]
      )
    )
      return message.channel.send(
        `That is not a valid http(s) URL!\nCorrect usage: \`\`${this.usage}\`\``
      );
    if (args[1].length > 32)
      return message.channel.send(
        'Emote names cannot be more than 32 characters.'
      );
    try {
      message.guild.emojis
        .create(args[0], args[1])
        .then((emoji) => message.channel.send(`${emoji} was created.`));
    } catch (err) {
      message.channel.send(
        'Something went wrong. Please double check the URL you gave'
      );
      throw err;
    }
  },
};
