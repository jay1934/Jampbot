module.exports = {
  name: 'say',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const msg = args.slice(0).join(' ');
    if (msg.length < 1) return message.delete();

    message.delete();
    message.channel.send(msg);
  },
};
