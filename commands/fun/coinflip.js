module.exports = {
  name: 'coinflip',
  helpIgnore: true,
  blacklist: true,
  async execute(message, args) {
    return Math.random() < 0.5
      ? message.channel.send('Heads <a:coin:733804322214903848>')
      : message.channel.send('Tails <a:coin:733804322214903848>');
  },
};
