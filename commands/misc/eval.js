/* eslint-disable no-eval */
const Discord = require('discord.js');
const fetch = require('node-fetch');
const request = require('request');
const f = require('../../utils/functions');
const levels = require('../../models/levels');
const guilds = require('../../models/guilds');

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

      message.channel.send(clean(evaled), { code: 'xl' });
    } catch (err) {
      message.channel.send(`Err: ${err}`);
      console.log(err);
    }
  },
};
