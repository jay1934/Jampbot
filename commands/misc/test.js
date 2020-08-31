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
var { hm } = require('../../data/inProgress.json');

const canva = new Canvacord();

module.exports = {
  name: 'test',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args, log) {
    const [first] = await fetch('https://dog.ceo/api/breeds/image/random').then(
      (response) => {
        Object.keys(JSON.parse(response.json()));
      }
    );
    message.channel.send(first);
  },
};
