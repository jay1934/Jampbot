const Discord = require('discord.js');
const { getRandomArrElement } = require('../utils/functions');

const dikdik = [
  'https://cdn.discordapp.com/attachments/699612856018272289/735301972420329530/266px-Dik-dik.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/735302976356483132/Z.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/735903024769138778/oNYchXMEZRmirb0-tn5wnrsl6i-_iCey2qJBnjrmQxI.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/735902893093421116/UcwBFGiJADcdj3EEojjU_4wKD5xR5R4oGDxJ05ktgSs.png',
];
module.exports = {
  name: 'dikdik',
  blacklist: true,
  helpIgnore: true,
  async execute(message, args) {
    if (
      message.author.id === '592950968354865162' ||
      message.author.id === '591923920261873677'
    ) {
      const lol = new Discord.MessageEmbed().setImage(
        getRandomArrElement(dikdik)
      );
      message.channel.send(lol);
    }
  },
};
