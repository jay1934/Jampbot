const Discord = require('discord.js');
const reports = require('../models/reports.js');
const { getUser } = require('../utils/functions.js');

module.exports = {
  name: 'closereport',
  rolePermission: 'Jampolice',
  helpIgnore: true,
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
    const confirmation = new Discord.MessageEmbed()
      .setTitle('Report Closed')
      .setColor('GREEN');
    if (reason) {
      closed.addField('Closing Message', reason, true);
      confirmation.addField('Closing Message', reason, true);
    }
    reports.findOne({ ReportID: args[0] }, async (err, data) => {
      if (err) console.log(err);
      if (!data)
        return message.channel.send(
          "There was an error. Double check you're using a valid report key"
        );
      if (data.Closed)
        return message.channel.send('This report is already closed');
      data.unshift({
        Closed: true,
      });
      data.save();
      getUser(data.CreatorID, message).send(closed);
      message.channel.send(confirmation);
    });
  },
};
