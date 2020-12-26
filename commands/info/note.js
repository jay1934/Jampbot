const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'note',
  guildOnly: true,
  exclusive: true,
  helpIgnore: true,
  rolePermission: '704378683988639834',
  async execute(message, args) {
    const good = '👍';
    const Note = args.slice(0).join(' ');
    if (!Note)
      return message.channel.send(
        '❌ You did not tell me what to note.\nCorrect usage: ``!note insert note here``'
      );
    if (Note.length > 2048)
      return message.channel.send(
        '❌ The embed character limit is ``2048`` characters. Please try again with a shorter message, or split your message into two different notes.'
      );
    const embed = new MessageEmbed()
      .setAuthor(`Noted by ${message.author.username}`)
      .setThumbnail(
        'https://cdn0.iconfinder.com/data/icons/online-education-butterscotch-vol-2/512/Student_Notes-512.png'
      )
      .setColor('GREEN')
      .setDescription(Note)
      .setFooter('React to mark as resolved');
    const msg = await message.guild.channels.cache
      .get('731248690550800406')
      .send(embed);
    await msg.react(good);
    await msg.pin();
    message.channel.send('Note added.');
  },
};
