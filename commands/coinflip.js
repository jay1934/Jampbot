module.exports = {
  name: 'coinflip',
  async execute(message, args) {
    const result = Math.random();
    if (result < 0.5) {
      message.channel.send('Heads <a:coin:733804322214903848>');
    } else {
      message.channel.send('Tails <a:coin:733804322214903848>');
    }
  },
};
