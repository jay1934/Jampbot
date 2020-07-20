const { DiscordAPIError } = require('discord.js');

const Discord = require('discord.js');

module.exports = {
  name: 'commands',
  async execute(message, args) {
    const help1 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Jampbot++ Commands')
      .setDescription(
        'Many of these commands will only work in #quaglad-spam to prevent, well, spam'
      );
    const help2 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Fun Commands')
      .addField(
        '``!8ball question``',
        'Ask the  magic 8ball whatever you desire',
        false
      )
      .addField('``!clap message``', 'Clappify 👏 a 👏 message', false)
      .addField(
        '``!compliment @user``',
        'Say thanks to someone who was nice <:SpigLove:719647374804385913>',
        false
      )
      .addField('``!dadjoke``', "Hey sometimes they're actually funny", false)
      .addField(
        '``!(en/de)code message``',
        'Convert a string to binary using ``!encode`` and convert binary to a string with ``!decode``',
        false
      )
      .addField(
        '``!f``',
        'Only use when the message above yours is <:NotLikeThis:717575061468610560> worthy',
        false
      )
      .addField('``!lenny``', '( ͡° ͜ʖ ͡°)', false)
      .addField('``!level-idea``', 'Get a randomly generated level idea', false)
      .addField(
        '``!quag``',
        'Posts a random image/gif of our lord and savior, quagsire',
        false
      )
      .addField('``!rps``', 'Play a game of rock paper scissors', false)
      .addField(
        '``!timer duration(30s, 45m, 2h, etc) [reminderMessage]``',
        'Set a timer for something',
        false
      );
    await message.react('717756118134423602');
    await message.author.send(help1);
    await message.author.send(help2);
  },
};
