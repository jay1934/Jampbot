module.exports = {
  name: 'lenny',
  helpIgnore: true,
  async execute(message, args) {
    message.delete();
    message.channel.send('( ͡° ͜ʖ ͡°)');
  },
};
