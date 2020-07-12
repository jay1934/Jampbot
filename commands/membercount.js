module.exports = {
  name: 'membercount',
  blacklist: true,
  async execute(message, args) {
    message.channel.send(
      `Team Jamp has \`\`${
        message.client.guilds.cache.get('699220238801174558').memberCount
      }\`\` members <a:PogJamper:704670075667611648>`
    );
  },
};
