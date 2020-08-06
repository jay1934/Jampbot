const Discord = require('discord.js');
const ms = require('ms');
const Levels = require('discord-xp');
const { progressbar } = require('discord.js-utility');
const Canvacord = require('canvacord');
const fetch = require('node-fetch');
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

const canva = new Canvacord();

module.exports = {
  name: 'test',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    /* const target = message.mentions.users.first() || message.author;
    console.log('cp1');
    const user = await Levels.fetch(target.id, message.guild.id);

    const rawLeaderboard = await Levels.fetchLeaderboard(
      message.guild.id,
      1000
    ); // We grab top 10 users with most xp in the current server.
    const leaderboard = Levels.computeLeaderboard(
      message.client,
      rawLeaderboard
    );
    console.log('cp2');
    const image = await canva.rank({
      username: target.username,
      discrim: target.discriminator,
      level: user.level,
      rank: leaderboard
        .filter((u) => u.userID === target.id)
        .map((u) => u.position),
      neededXP: Levels.xpFor(user.level + 1),
      currentXP: user.xp,
      avatarURL: target.displayAvatarURL({ format: 'png' }),
      color: 'white',
      background:
        'https://thumbs.gfycat.com/AnimatedDeficientAlleycat-size_restricted.gif',
    });
    console.log('cp4');
    const attachment = new Discord.MessageAttachment(image, 'rank.png');
    console.log('cp5');
    message.channel.send(attachment); */
  },
};
