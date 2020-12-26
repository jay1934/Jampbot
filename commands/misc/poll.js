const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const agree = '👍';
const disagree = '👎';
module.exports = {
  name: 'poll',
  guildOnly: true,
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args, log) {
    var indefinite;
    const time = args[0];
    if (!time) {
      return message.delete();
    }

    if (time <= 0 && time !== 'indefinite') {
      return message.delete();
    }

    if (time === 'indefinite') indefinite = true;

    let question =
      args.slice(1).join(' ').substring(0, 1).toUpperCase() +
      args.slice(1).join(' ').substring(1);
    if (!question) return message.delete();

    if (!question.endsWith('?')) question += '?';

    message.delete();
    const Embed = new MessageEmbed()
      .setTitle(`New poll!`)
      .setThumbnail(
        'https://i.dlpng.com/static/png/4199263-free-poll-icon-229142-download-poll-icon-229142-polling-png-300_300_preview.webp'
      )
      .setDescription(`${question}`)
      .setFooter('Please only react once')
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
    const msg = await message.channel.send(Embed);
    msg
      .react(agree)
      .then(() => msg.react(disagree))
      .then(() => msg.pin());

    if (indefinite === false) {
      const reactions = await msg.awaitReactions(
        (reaction) =>
          reaction.emoji.name === agree || reaction.emoji.name === disagree,
        { time: ms(time), long: true }
      );

      const resultsEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Poll Results')
        .setThumbnail(
          'https://i.dlpng.com/static/png/4199263-free-poll-icon-229142-download-poll-icon-229142-polling-png-300_300_preview.webp'
        )
        .setDescription(`Results for the Poll: ${question}`);
      try {
        resultsEmbed.addField(
          `${agree}:`,
          `${reactions.get(agree).count - 1} Votes`
        );
      } catch {
        resultsEmbed.addField(`${agree}:`, `0 Votes`);
      }
      try {
        resultsEmbed.addField(
          `${disagree}:`,
          `${reactions.get(disagree).count - 1} Votes`
        );
      } catch {
        resultsEmbed.addField(`${disagree}:`, `0 Votes`);
      }
      resultsEmbed.setTimestamp();
      msg.unpin();
      message.channel.send(resultsEmbed);
      if (log) log.send(resultsEmbed);

      // create new embed with old title & description, new field
      const newEmbed = new MessageEmbed({
        title: 'Voting Closed',
        description: question,
        thumbnail: {
          url:
            'https://i.dlpng.com/static/png/4199263-free-poll-icon-229142-download-poll-icon-229142-polling-png-300_300_preview.webp',
        },
        fields: [
          {
            name: 'Results',
            value: `${agree}: ${
              reactions.get(agree).count - 1
            } ⋅ ${disagree}: ${reactions.get(disagree).count - 1}`,
          },
        ],
        color: 15158332,
        footer: {
          text: `The poll lasted ${ms(ms(time), {
            long: true,
          })}`,
        },
      });

      msg.edit(newEmbed);
    }
  },
};
