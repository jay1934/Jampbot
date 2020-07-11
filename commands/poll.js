const Discord = require("discord.js");
const ms = require("ms");
const config = require("../config");
const agree = "👍";
const disagree = "👎";
module.exports = {
  name: "poll",
  guildOnly: true,
  ownerOnly: true,
  async execute(message, args) {
    const usage =
      "\nCorrect usage: ``!poll duration[s/m/h/indefinite] question``";
    var indefinite = false;
    let time = args[0];
    if (!time) {
      return message.channel.send(
        `❌ Please enter a time period followed by \`\`s, m, or h\`\` *or* use \`\`indefinite\`\` instead.${usage}`
      );
    }

    if (time <= 0 && time != "indefinite") {
      return message.channel.send(
        `❌ Please Enter a time period followed by \`\`s, m, or h\`\`.${usage}`
      );
    }

    if (time == "indefinite") indefinite = true;

    let question =
      args.slice(1).join(" ").substring(0, 1).toUpperCase() +
      args.slice(1).join(" ").substring(1);
    if (!question)
      return message.channel.send(
        `❌ You did not specify your question.${usage}`
      );

    if (!question.endsWith("?")) question = question + "?";

    message.delete();
    const Embed = new Discord.MessageEmbed()
      .setTitle(`New poll!`)
      .setThumbnail(
        "https://i.dlpng.com/static/png/4199263-free-poll-icon-229142-download-poll-icon-229142-polling-png-300_300_preview.webp"
      )
      .setDescription(`${question}`)
      .setFooter("Please only react once")
      .setColor(`GREEN`)
      .setTimestamp();

    if (time && indefinite === true) {
      Embed.setFooter(`The poll has no end time. Please only vote once.`);
    } else {
      Embed.setFooter(
        `The poll will be open for ${ms(ms(time), {
          long: true,
        })}. Please only vote once.`
      );
    }
    let msg = await message.channel.send(Embed);
    await msg.react(agree);
    await msg.react(disagree);
    await msg.pin();

    if (indefinite === false) {
      const reactions = await msg.awaitReactions(
        (reaction) =>
          reaction.emoji.name == agree || reaction.emoji.name == disagree,
        { time: ms(time), long: true }
      );

      let resultsEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Poll Results")
        .setThumbnail(
          "https://i.dlpng.com/static/png/4199263-free-poll-icon-229142-download-poll-icon-229142-polling-png-300_300_preview.webp"
        )
        .setDescription(`Results for the Poll: ${question}`);
      try {
        resultsEmbed.addField(
          `${agree}:`,
          `${reactions.get(agree).count - 1} Votes`
        );
      } catch (e) {
        resultsEmbed.addField(`${agree}:`, `0 Votes`);
      }
      try {
        resultsEmbed.addField(
          `${disagree}:`,
          `${reactions.get(disagree).count - 1} Votes`
        );
      } catch (e) {
        resultsEmbed.addField(`${disagree}:`, `0 Votes`);
      }
      resultsEmbed.setTimestamp();
      msg.unpin();
      message.channel.send({ embed: resultsEmbed });
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: resultsEmbed });

      // create new embed with old title & description, new field
      const newEmbed = new Discord.MessageEmbed({
        title: "Voting Closed",
        description: question,
        thumbnail: {
          url:
            "https://i.dlpng.com/static/png/4199263-free-poll-icon-229142-download-poll-icon-229142-polling-png-300_300_preview.webp",
        },
        color: "RED",
        footer: {
          text: `The poll lasted ${ms(ms(time), {
            long: true,
          })}`,
        },
      });

      // edit message with new embed
      // NOTE: can only edit messages you author
      msg.edit(newEmbed);
    }
  },
};
