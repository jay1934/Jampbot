module.exports = {
  name: "laugh",
  async execute(message, args) {
    message.delete();
    message.channel.send("ha that's so funny");
  }
};
