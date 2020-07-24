const { getRandomInt, getEmoji } = require('../utils/functions');

module.exports = {
  name: 'pickadoor',
  blacklist: true,
  async execute(message, args) {
    if (!args[0])
      return message.channel.send(
        "You didn't pick a door (1-4)\nYou can raise the limit by specifying a second value\n``!pickadoor <door> [number of doors]``"
      );
    var doors = args[1] || 4;
    if (parseInt(doors) > 9999999999999999999999)
      return message.channel.send(
        `To many doors; you're going to lag out the game${getEmoji(
          'What',
          message
        )}`
      );
    if (args[0] > parseInt(doors))
      return message.channel.send(
        `There are only ${doors} doors${getEmoji('WeirdChamp', message)}`
      );
    var result = getRandomInt(1, parseInt(doors));
    console.log(result);
    if (result === parseInt(args[0])) {
      message.channel.send('You picked the right door 🚪');
    } else {
      message.channel.send(
        `You picked the wrong door 🚪\nThe correct door was number ${result}`
      );
    }
  },
};
