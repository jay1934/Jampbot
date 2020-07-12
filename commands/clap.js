module.exports = {
  name: 'clap',
  noPing: true,
  async execute(message, args) {
    const usage = '\nCorrect usage: ``!clap enter string here``';
    if (args.length < 1)
      return message.channel.send('❌ Please provide some text to clapify');
    message.channel.send(args.join(' :clap: '));

    message.delete();
  },
};
