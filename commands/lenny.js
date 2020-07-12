module.exports = {
  name: 'lenny',
  async execute(message, args) {
    message.delete();
    message.channel.send('( ͡° ͜ʖ ͡°)');
  },
};
