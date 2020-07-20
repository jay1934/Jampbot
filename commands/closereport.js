const Discord = require('discord.js');

module.exports = {
  name: 'closereport',
  modOnly: true,
  guildOnly: true,
  blacklist: true,
  async execute(message, args) {
    if (message.channel.id !== '727987886934196286')
      return message.channel.send('This channel is not a ``reports`` channel');
    const id = args[0];
    if (!id)
      return message.channel.send(
        'Please enter the report key (can be found at the top of the original report message) of the report you would like to close'
      );

    const reason = args.slice(1).join(' ');
    const closed = new Discord.MessageEmbed()
      .setTitle('Your ticket has been closed')
      .setColor('GREEN')
      .setDescription(
        'Thank you for submitting a report and helping us make Team Jamp a better place!'
      )
      .setFooter(
        'Please contact a moderator or submit another report with any further questions or concerns'
      );
    try {
      const decoded = id.slice(6, -3);
      const confirmation = new Discord.MessageEmbed()
        .setTitle('Report Closed')
        .setColor('GREEN');
      if (reason) {
        closed.addField('Closing Message', reason, true);
        confirmation.addField('Closing Message', reason, true);
      }
      message.client.users.cache.get(decoded).send(closed);
      message.channel.send(confirmation);
    } catch {
      message.channel.send(
        "There was an error. Double check you're using a valid report key"
      );
    }
  },
};
