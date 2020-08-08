const time = require('../../models/reports');
const { makeID, getDifferenceInDHMS } = require('../../utils/functions');

module.exports = {
  name: 'stopwatch',
  aliases: ['sw'],
  category: 'misc',
  usage: '!stopwatch [key] [stop]',
  description: 'Starts a stopwatch',
  async execute(message, args) {
    if (!args[0]) {
      const key = makeID(3);
      const current = Date();
      const newTime = new time({
        Key: key,
        UserID: message.author.id,
        Date: current,
      });
      await newTime.save();
      console.log(newTime);
      message.channel.send(
        `A new stopwatch has been created with the ID: \`\`${key}\`\`!\nUse \`\`!sw <key>\`\` to see your progress, and \`\`!sw <key> stop\`\` to stop your stopwatch!`
      );
    } else if (args[1] !== 'stop') {
      const newDate = new Date();
      time.findOne({ Key: args[0] }, async (err, data) => {
        if (err) console.log(err);
        if (!data)
          return message.channel.send(
            "I can't find anything with that key! If you haven't created a stopwatch, use ``!sw``. Otherwise, double-check the key you're using."
          );
        message.channel.send(
          `This stopwatch has been counting for ${getDifferenceInDHMS(
            data.Date,
            newDate,
            'day'
          )} days, ${getDifferenceInDHMS(
            data.Date,
            newDate,
            'hour'
          )} hours, ${getDifferenceInDHMS(
            data.Date,
            newDate,
            'minute'
          )} minutes, and ${getDifferenceInDHMS(
            data.Date,
            newDate,
            'second'
          )} seconds.`
        );
      });
    } else {
      const newDate = new Date();
      time.findOne(
        { Key: args[0], UserID: message.author.id },
        async (err, data) => {
          if (err) console.log(err);
          if (!data)
            return message.channel.send(
              "I can't find anything with that key! If you haven't created a stopwatch, use ``!sw``. Otherwise, double-check the key you're using, ad make sure **you're the author of that stopwatch**."
            );
          message.channel.send(
            `This stopwatch was counting for ${getDifferenceInDHMS(
              data.Date,
              newDate,
              'day'
            )} days, ${getDifferenceInDHMS(
              data.Date,
              newDate,
              'hour'
            )} hours, ${getDifferenceInDHMS(
              data.Date,
              newDate,
              'minute'
            )} minutes, and ${getDifferenceInDHMS(
              data.Date,
              newDate,
              'second'
            )} seconds, and is now removed.`
          );
        }
      );
    }
  },
};
