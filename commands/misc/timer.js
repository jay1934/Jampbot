const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'timer',
  category: 'misc',
  usage: '!timer <duration(10s, 12h, etc)> [reminder]',
  description: 'Sets a timer',
  async execute(message, args) {
    const Timer = args[0];
    var Description = args.slice(1).join(' ') || 'No Description Given';
    Description =
      Description.substring(0, 1).toUpperCase() + Description.substring(1);
    if (!args[0]) {
      return message.channel.send(
        `❌ Please Enter a time period followed by "s or m or h".\nCorrect usage: \`\`${this.usage}\`\``
      );
    }

    if (args[0] <= 0) {
      return message.channel.send(
        `❌ Please Enter a time period followed by "s or m or h".\nCorrect usage: \`\`${this.usage}\`\``
      );
    }
    message.channel.send(
      ':white_check_mark: ' +
        ' Timer Started for: ' +
        `${ms(ms(Timer), { long: true })}`
    );

    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setThumbnail(
        'https://media.discordapp.net/attachments/719694477027180544/721930494828347432/1592192036830.png'
      )
      .setTitle(`Your Timer Finished`)
      .addField('Duration', ms(ms(Timer), { long: true }))
      .addField('Description', Description);

    setTimeout(() => {
      message.channel.send(`<@${message.author.id}>`);
      message.channel.send(embed);
    }, ms(Timer));
  },
};
