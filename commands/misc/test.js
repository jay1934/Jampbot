const Discord = require('discord.js');
const ms = require('ms');
const Levels = require('discord-xp');
const config = require('../../config.json');
const {
  getChannel,
  getGuild,
  getEmoji,
  getRole,
  getReactions,
  getNextMessage,
  makeID,
} = require('../../utils/functions');

module.exports = {
  name: 'test',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    var data = [];
    for (var i = 1; i <= 20; i++) data.push(`Level ${i}: ${Levels.xpFor(i)}`);
    message.channel.send(data.join('\n'));
  },
};
