module.exports = {
  name: "say",
  ownerOnly: true,
  async execute(message, args) {
    let msg = args.slice(0).join(" ");
    if (msg.length < 1) return message.delete();

    message.delete();
    message.channel.send(msg);
  }
};
