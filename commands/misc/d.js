module.exports = {
  name: 'd',
  ownerOnly: true,
  guildOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    if (!args[0]) return;
    if (args[0] !== 'bump') return;
    setTimeout(function () {
      message.channel.bulkDelete(2);
    }, 750); // time in milliseconds
  },
};
