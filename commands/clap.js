module.exports = {
  name: "clap",
  async execute(message, args) {
    if (args.length < 1)
      return message.channel.send("❌ Please provide some text to clapify");

    message.channel.send(args.join(" :clap: "));

    message.delete();
  }
};
