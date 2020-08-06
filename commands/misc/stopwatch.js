const time = require('../../models/reports');
const { makeID } = require('../../utils/functions');

module.exports = {
  name: 'stopwatch',
  aliases: ['sw'],
  category: 'misc',
  usage: '!stopwatch [key] [stop]',
  description: 'Starts a stopwatch',
  async execute(message, args) {
    function getDifferenceInDays(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    }

    function getDifferenceInHours(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.round(diffInMs / (1000 * 60 * 60));
    }

    function getDifferenceInMinutes(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.round(diffInMs / (1000 * 60));
    }

    function getDifferenceInSeconds(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.round(diffInMs / 1000);
    }
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
          `This stopwatch has been counting for ${
            getDifferenceInDays(data.Date, newDate) === 0
              ? ''
              : `${getDifferenceInDays(data.Date, newDate)} days, `
          }${
            getDifferenceInHours(data.Date, newDate) === 0 &&
            getDifferenceInDays(data.Date, newDate) === 0
              ? ''
              : `${getDifferenceInHours(data.Date, newDate)} hours, `
          }${
            getDifferenceInMinutes(data.Date, newDate) === 0 &&
            getDifferenceInHours(data.Date, newDate) === 0 &&
            getDifferenceInDays(data.Date, newDate) === 0
              ? ''
              : `${getDifferenceInMinutes(data.Date, newDate)} minutes${
                  getDifferenceInHours(data.Date, newDate) === 0 &&
                  getDifferenceInDays(data.Date, newDate) === 0
                    ? ' and '
                    : ', and '
                }`
          }${getDifferenceInSeconds(data.Date, newDate)} seconds.`
        );
      });
    } else {
      const newDate = new Date();
      time.findOneAndDelete(
        { Key: args[0], UserID: message.author.id },
        async (err, data) => {
          if (err) console.log(err);
          if (!data)
            return message.channel.send(
              "I can't find anything with that key! If you haven't created a stopwatch, use ``!sw``. Otherwise, double-check the key you're using, ad make sure **you're the author of that stopwatch**."
            );
          message.channel.send(
            `This stopwatch was counting for ${
              getDifferenceInDays(data.Date, newDate) === 0
                ? ''
                : `${getDifferenceInDays(data.Date, newDate)} days, `
            }${
              getDifferenceInHours(data.Date, newDate) === 0 &&
              getDifferenceInDays(data.Date, newDate) === 0
                ? ''
                : `${getDifferenceInHours(data.Date, newDate)} hours, `
            }${
              getDifferenceInMinutes(data.Date, newDate) === 0 &&
              getDifferenceInHours(data.Date, newDate) === 0 &&
              getDifferenceInDays(data.Date, newDate) === 0
                ? ''
                : `${getDifferenceInMinutes(data.Date, newDate)} minutes${
                    getDifferenceInHours(data.Date, newDate) === 0 &&
                    getDifferenceInDays(data.Date, newDate) === 0
                      ? ' and '
                      : ', and '
                  }`
            }${getDifferenceInSeconds(
              data.Date,
              newDate
            )} seconds, and is now removed.`
          );
        }
      );
    }
  },
};
