const Discord = require('discord.js');
const { getRandomArrElement } = require('../utils/functions');

const randPokes = [
  'https://cdn.discordapp.com/attachments/699222200787402762/734191842014527508/554-5549243_079slowpoke-ag-anime-slowpoke-pokemon.png',
  'https://cdn.discordapp.com/attachments/699222200787402762/734191864860901446/b3b062e5fb423b6f.png',
  'https://cdn.discordapp.com/attachments/699222200787402762/734191885761118309/EbUO51MUMAAwqi2.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734191914831708190/Lola_Slowpoke.png',
  'https://cdn.discordapp.com/attachments/699222200787402762/734191938730852413/Time_Oblivious_Slowpoke.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734191967197462559/unnamed.gif',
  'https://cdn.discordapp.com/attachments/699222200787402762/734191997891641354/TUFesEU.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192032477872148/tumblr_n997y2YrPy1r8sc3ro2_400.png',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192073552429116/Slowpoke.600.2993343.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192101151211560/slowpoke1.png',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192142830010458/tumblr_b75188b5ac4872af470912a05f14495f_52c78d97_400.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192772692705382/slowpoke1.jpeg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192804150116412/d2pg9fl-1777f163-f7fa-4f31-aa09-19ad8af34126.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192850832457818/d1c8ceda64758e735ad50123f74ab428.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192878221262878/0de49193103f63005a05ae1aba96c946.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734192994634301506/pokemon-sword-shield-galarian-slowpoke-cut-scene.jpg',
  'https://cdn.discordapp.com/attachments/699222200787402762/734195149311311872/1235895400745.jpg',
];

module.exports = {
  name: 'slowpoke',
  blacklist: true,
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Slowpoke Intensifies')
      .setImage(getRandomArrElement(randPokes));
    message.channel.send({ embed });
  },
};
