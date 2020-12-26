module.exports = {
  name: 'membercount',
  blacklist: true,
  helpIgnore: true,
  async execute(message) {
    message.channel.send(
      `${message.guild.name} has \`\`${
        message.client.guilds.cache.get('699220238801174558').memberCount
      }\`\` members <a:PogJamper:704670075667611648>`
    );
  },
};
