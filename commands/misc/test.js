const Discord = require('discord.js');
const ms = require('ms');
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
    message.channel.send('I AM ALIVE');
  },
};
