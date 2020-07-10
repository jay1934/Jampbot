const warns = require("../models/warns.js");
module.exports = {
  name: "warn",
  modOnly: true,
  guildOnly: true,
  disabled: true,
  async execute (message, args) {
    const usage = '\nCorrect usage: ``!warn @user reason``' 
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`❌ You did not mention a user.${usage}`);
    if (!args.slice(1).join(" "))
      return message.channel.send(`❌ You did not specify a reason.${usage}`);
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.save();
          message.channel.send(
            `${user.tag} has been warned with the reason of ${args
              .slice(1)
              .join(" ")}. They now have 1 warn.`
          );
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          message.channel.send(
            `${user.tag} has been warned with the reason of ${args
              .slice(1)
              .join(" ")}. They now have ${data.Warns.length} warns.`
          );
        }
      }
    );
  },
};