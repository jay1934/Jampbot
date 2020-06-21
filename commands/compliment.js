const compliments = require("../data/compliments.json");
module.exports = {
  name: "compliment",
  blacklist: true,
  execute(message, args) {

    let user = message.mentions.members.first();
    if (!user)
      return message.channel.send("❌ Tag someone to send them a compliment!");

    if (user.id === message.author.id) {
      return message.channel.send(
        `*Well you're a little narcissistic* :rolling_eyes:`
      );
    } else
      return message.channel.send(
        `**<@${user.username}>**, ${
          compliments[Math.floor(Math.random() * compliments.length)]
        } :heart:`
      );
  }
};
