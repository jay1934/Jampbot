module.exports = {
  name: 'pickadoor',
  blacklist: true,
  category: 'fun',
  usage: '!pickadoor <door> [number of doors]',
  description: 'Play a quick game of pick-a-path',
  async execute(message, args) {
    if (!args[0])
      return message.channel.send(
        `You didn't pick a door (1-4)\nCorrect usage: \`\`${this.usage}\`\``
      );
    var doors = args[1] || 4;
    if (parseInt(doors) > 9999999999999999999999)
      return message.channel.send(
        `To many doors; you're going to lag out the game ${message.guild.emojis.cache.find(
          (emoji) => emoji.name === 'What'
        )}`
      );
    if (args[0] > parseInt(doors))
      return message.channel.send(
        `There are only ${doors} doors ${message.guild.emojis.cache.find(
          (emoji) => emoji.name === 'WeirdChamp'
        )}`
      );
    var result = Math.inRange(1, parseInt(doors));
    if (result === parseInt(args[0])) {
      message.channel.send('You picked the right door 🚪');
    } else {
      message.channel.send(
        `You picked the wrong door 🚪\nThe correct door was number ${result}`
      );
    }
  },
};
