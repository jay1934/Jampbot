module.exports = {
  name: "annoy",
  execute(message, args) {

    if (!message.member.hasPermission(["MANAGE_EMOJIS"]))
      return message.channel.send(
        "❌ Only higher-ups can annoy others :smiling_imp:"
      );
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1)
      return message.channel.send(
        "❌ You gotta mention someone to annoy them smh.\nCorrect usage: ``!annoy @user [custom message]``"
      );

    if (message.mentions.users.size > 1)
      return message.channel.send(
        "❌ I can only annoy one person at once gimme a break smh"
      );
    if (user.id === message.client.user.id)
      return message.channel.send(
        "❌ uh huh let me just annoy myself real quick :rolling_eyes:"
      );
    if (user.id === "381490382183333899")
      return message.channel.send(
        "❌ smh Lioness is perfect we mustn't annoy them"
      );

    if (user.id === message.author.id)
      return message.channel
        .send(`❌ You're already annoying me, don't annoy yourself as well 
<:CmonBruh:717593939686982024>`);

    let spam = args.slice(1).join(" ");

    if (spam.length < 1) spam = `lol I pinged you :)`;

    user.send(`${spam}
*Message sent by* ***${message.author.username}***`);

    if (spam !== `lol I pinged you :)`) {
      message.channel
        .send(`Okey dokey I annoyed **${user.username}** <:NotLikeThis:717575061468610560>

**Custom Message:** 
${spam}`);
    }

    if (spam === `lol I pinged you :)`) {
      message.channel.send(
        `Okey dokey I annoyed **${user.username}** <:NotLikeThis:717575061468610560>`
      );
    }
  }
};
