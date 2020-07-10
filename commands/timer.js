var ms = require("ms");
const Discord = require("discord.js");

module.exports = {
  name: "timer",
  async execute(message, args) {
    const usage = '\nCorrect usage: ``!timer duration[s/m/h/d] [description]``' 
    let Timer = args[0];
    let Description = args.slice(1).join(" ");
    if (!Description) Description = `No Description Given`;
    let Desc =
      Description.substring(0, 1).toUpperCase() + Description.substring(1);
    if (!args[0]) {
      return message.channel.send(
        `❌ Please Enter a time period followed by "s or m or h".${usage}`
      );
    }

    if (args[0] <= 0) {
      return message.channel.send(
        `❌ Please Enter a time period followed by "s or m or h".${usage}`
      );
    }

    message.channel.send(
      ":white_check_mark: " +
        " Timer Started for: " +
      `${ms(ms(Timer), {long: true})}`
    );

    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(
        "https://media.discordapp.net/attachments/719694477027180544/721930494828347432/1592192036830.png"
      )
      .setTitle(`Your Timer Finished`)
      .addField("Duration", ms(ms(Timer), { long: true }))
      .addField("Description", Desc);

    setTimeout(function() {
      message.channel.send(`<@${message.author.id}>`);
      message.channel.send({ embed });
    }, ms(Timer));
  }
};
