/* eslint-disable no-eval */
const Discord = require('discord.js');
const fetch = require('node-fetch');
const request = require('request');
const moment = require('moment');
const f = require('../../utils/functions');
const levels = require('../../models/levels');
const guilds = require('../../models/guilds');
const { getNextMessage } = require('../../utils/functions');

getNextMessage();
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
      let evaled = eval(code);

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('GREEN')
          .setAuthor("Lioness' Eval Results", message.author.displayAvatarURL())
          .addField('Input:', `\`\`\`js\n${args.join(' ')}\n\`\`\``)
          .addField('Output:', `\`\`\`js\n${clean(evaled)}\n\`\`\``)
      );
    } catch (err) {
      message.channel.send(`Err: ${err}`);
      console.log(err);
    }
  },
};
