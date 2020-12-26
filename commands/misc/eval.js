/* eslint-disable no-eval */
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'eval',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const clean = (text) => {
      if (typeof text === 'string')
        return text
          .replace(/`/g, `\`${String.fromCharCode(8203)}`)
          .replace(/@/g, `@${String.fromCharCode(8203)}`);
      return text;
    };
    try {
      const code = args.join(' ');

      message.channel.send(
        new MessageEmbed()
          .setColor('GREEN')
          .setAuthor("Lioness' Eval Results", message.author.displayAvatarURL())
          .addField('Input:', `\`\`\`js\n${args.join(' ')}\n\`\`\``)
          .addField(
            'Output:',
            `\`\`\`js\n${clean(
              typeof eval(code) === 'string'
                ? require('util').inspect(eval(code))
                : eval(code)
            )}\n\`\`\``
          )
      );
    } catch (err) {
      console.error(err);
    }
  },
};
