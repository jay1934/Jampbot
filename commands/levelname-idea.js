const { getRandomArrElement } = require('../utils/functions');

module.exports = {
  name: 'levelname-idea',
  blacklist: true,
  async execute(message, args) {
    const names = {
      word1: [
        'Freeze',
        'Dry',
        'Piranha',
        'Shiver',
        'Lava',
        'Molten',
        'Magma',
        'Beach',
        'Bob-omb',
        'Chilly',
        'Frozen',
        'Desert',
        'Cheep-Cheep',
        'Cloud',
        'Tropical',
        'Bubbly',
        'Scorched',
        'Deserted',
        'Fallen',
        'Heartbroken',
      ],

      word2: [
        'Bubble',
        'Cactus',
        'Flame',
        'Berry',
        'Bean',
        'Cannon',
        'Pipe',
        'Fire',
        'Tropical',
        '',
        '',
        '',
        '',
      ],

      word3: [
        'Hill',
        'Village',
        'Bay',
        'Falls',
        'Island',
        'Fort',
        'Battlefield',
        'Tower',
        'Castle',
        'Labyrinth',
        'Maze',
        'Warship',
        'Plains',
        'Mountain',
        'Palace',
        'Cavern',
      ],
    };

    const result = `${getRandomArrElement(names.word1)} ${getRandomArrElement(
      names.word2
    )} ${getRandomArrElement(names.word3)}`;
    message.channel.send(result);
  },
};
