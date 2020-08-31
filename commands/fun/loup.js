const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loup',
  helpIgnore: true,
  async execute(message, args, log) {
    message.channel.send(
      new MessageEmbed()
        .setColor('GREEN')
        .setImage(
          'https://cdn.discordapp.com/attachments/699220239698886679/748908648666890300/tempFileForShare_20200828-101530.jpg'
        )
    );
  },
};
