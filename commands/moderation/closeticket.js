const Discord = require('discord.js');
const { getUser } = require('../../utils/functions');

module.exports = {
  name: 'closeticket',
  rolePermission: 'Jampolice',
  guildOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    if (
      !message.channel.name.includes('user-report-') ||
      message.channel.parentID !== '727561183921569832' ||
      !message.channel.topic.includes('Creator ID: ')
    )
      return message.channel.send('This channel is not a ``ticket``');
    const reason = args.slice(0).join(' ');
    const creator = message.channel.topic.match(/^.+(?='s Report)/);
    const closed = new Discord.MessageEmbed()
      .setTitle('Your ticket has been closed')
      .setColor('GREEN')
      .setDescription(
        'Thank you for submitting a report and helping us make Team Jamp a better place!'
      )
      .setFooter(
        'Please contact a moderator or submit another report with any further questions or concerns'
      );
    if (reason) {
      closed.addField('Closing Message', reason, true);
    }

    await getUser(creator, message).send(closed);
    await message.channel.delete();
  },
};
