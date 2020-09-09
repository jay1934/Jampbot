/* eslint-disable prefer-destructuring */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
const Discord = require('discord.js');
const Levels = require('discord-xp');
const { progressbar } = require('discord.js-utility');
const Canvacord = require('canvacord');
const fetch = require('node-fetch');
var Game = require('hangman-game-engine');
var request = require('request');
const nitro = require('discordnitro');
const guilds = require('../../models/guilds');
const config = require('../../config.json');
const {
  getChannel,
  getGuild,
  getEmoji,
  getRole,
  getReactions,
  getNextMessage,
  makeID,
  toFirstUpperCase,
} = require('../../utils/functions');

const canva = new Canvacord();

module.exports = {
  name: 'test',
  args: 'hello <friend> | goodbye [buddy]',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args, log) {
    message.channel.send('Query Accepted');
  },
};
