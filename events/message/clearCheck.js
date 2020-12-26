module.exports = async (message) => {
  // if message is sent by Jampbot Deluxe
  if (
    message.author.id === '666085542085001246' &&
    message.content.includes('‣You have cleared') &&
    message.content.includes('‣You have earned')
  ) {
    try {
      // get the level name; everything within the single quotes
      const level = message.content.match(/'(.+)'/);
      const creator = message.content.match(/ by (.+?)(?=\s<a?:)+/);
      if (/<@!?(\d+)>/.test(creator[1])) {
        const noPingExec = creator[1].match(/<@!?(\d+)>/);
        creator[1] = message.client.users.cache.get(noPingExec[1]).username;
      }
      const pointsEarned = message.content.match(
        /((?:[0-6]\d|[0-9])(?:\.\d)?) points?/
      );
      let exec = message.content.match(/.+?(?=<a?:)/).toString();
      if (/<@!?(\d+)>/.test(exec)) {
        const noPingExec = exec.match(/<@!?(\d+)>/);
        exec = message.client.users.cache.get(noPingExec[1]).username;
      }
      const emote = message.content.match(/:((?:\w+Jamper|Jumper)):/);
      if (pointsEarned[1] > 5.9) {
        message.guild.channels.cache
          .get('699230720392167482')
          .send(
            `🔴 **${exec} **${message.guild.emojis.cache.find(
              (emoji) => emoji.name === emote[1]
            )} submitted a clear for **${level[1]}** by **${
              creator[1]
            }** and has earned **${pointsEarned[0]}** 🔴`
          );
      }
    } catch (err) {
      console.error(err);
    }
  }
};
