const { getUser, getChannel, getEmoji } = require('../../utils/functions');
const config = require('../../config.json');

module.exports = async (message) => {
  // if message is sent by Jampbot Deluxe
  if (
    message.author.id === config.deluxe &&
    message.content.includes('‣You have cleared') &&
    message.content.includes('‣You have earned')
  ) {
    try {
      // get the level name; everything within the single quotes
      const level = message.content.match(/'(.+)'/);
      const creator = message.content.match(/ by (.+?)(?=\s<a?:)+/);
      if (/<@!?(\d+)>/.test(creator[1])) {
        const noPingExec = creator[1].match(/<@!?(\d+)>/);
        creator[1] = getUser(noPingExec[1], message.client).username;
      }
      const pointsEarned = message.content.match(
        /((?:[0-6]\d|[0-9])(?:\.\d)?) points?/
      );
      let exec = message.content.match(/.+?(?=<a?:)/).toString();
      if (/<@!?(\d+)>/.test(exec)) {
        const noPingExec = exec.match(/<@!?(\d+)>/);
        exec = getUser(noPingExec[1], message.client).username;
      }
      const emote = message.content.match(/:((?:\w+Jamper|Jumper)):/);
      if (pointsEarned[1] > 5.9) {
        getChannel(config.channelID.modlog, message.client).send(
          `🔴 **${exec} **${getEmoji(
            emote[1],
            message.client
          )} submitted a clear for **${level[1]}** by **${
            creator[1]
          }** and has earned **${pointsEarned[0]}** 🔴`
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
};
