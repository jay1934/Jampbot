const { getGuild, getEmoji } = require('../utils/functions');

module.exports = {
  name: 'membercount',
  blacklist: true,
  async execute(message, args) {
    message.channel.send(
      `Team Jamp has \`\`${
        getGuild('Team Jamp', message).memberCount
      }\`\` members <a:PogJamper:704670075667611648>`
    );
  },
};
