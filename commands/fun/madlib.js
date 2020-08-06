const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { progressbar } = require('discord.js-utility');
const {
  getNextMessage,
  getRandomInt,
  arrMove,
} = require('../../utils/functions');

module.exports = {
  name: 'madlib',
  cooldown: 3600,
  setLevel: 10,
  aliases: ['ml'],
  category: 'fun',
  usage: 'madlib',
  blacklist: true,
  description: 'Fill out a madlib on Discord!',
  async execute(message, args) {
    const options = [
      {
        title: 'Albert Einstein',
        story: `Albert Einstein, the son of [0] and [1],
        was born in Ulm, Germany, in 1879. In 1902, he had a job
        as assistant [2] in the Swiss patent office and attended
        the University of Zurich. There he began studying atoms, molecules,
        and [3]. He developed the theory of
        [4] relativity, which expanded the phenomena of sub-atomic
        [5] and [6] magnetism. In 1921,
        he won the Nobel prize for [7] and was director of
        theoretical physics at the Kaiser Wilhelm [8] in Berlin.
        In 1933, when Hitler became Chancellor of [9],
        Einstein came to America to take a post at Princeton Institute for
        [10] where his theories helped America devise the first
        atomic [11]. There is no question about it: Einstein was
        one of the most brilliant [12] of our time.`,
        blanks: [
          'male celebrity',
          'female celebrity',
          'noun',
          'plural noun',
          'adjective',
          'plural noun',
          'adjective',
          'plural noun',
          'noun',
          'place',
          'plural noun',
          'noun',
          'plural profession',
        ],
      },

      {
        title: `Be a Photographer`,
        story: `Many [0] photographers make big money photographing
        [1] and beautiful [2]. They sell the prints
        to [3] magazines or to agencies who use them in
        [4] advertisements. To be a photographer, you have to
        have a [5] camera. You also need an [6]
        meter and filters and a special close-up [7]. Then you
        either hire professional [8] or go out and snap candid
        pictures of ordinary [9]. But if you want to have a
        career, you must study very [10] for at least [11] years.`,
        blanks: [
          'adjective',
          'plural noun',
          'plural noun',
          'adjective',
          'noun',
          'noun',
          'adjective',
          'noun',
          'plural noun',
          'plural noun',
          'adjective',
          'number',
        ],
      },

      {
        title: 'Charlemagne',
        story: `Charlemagne was the [0] King of the Franks and
        [1]. In 800 A.D., he was crowned Emperor of the
        Holy Roman [2] by Pope Leo the Third. He was born in
        742. His father was Pepin the [3], and his grandfather
        was Charles the [4]. Charlemagne converted thousands
        of Saxons, who were [5] worshippers, to Christianity. He
        converted them by cutting off their [6] and setting fire
        to it o_O. In 778, he invaded Spain, but was defeated
        by the Moors at [7]. Charlemagne was uneducated, but
        he had great respect for education and established many [8]
        schools. He was known for the justice of his [9] and
        his kindness to [10] people.`,
        blanks: [
          'adjective',
          'plural nationality',
          'noun',
          'adjective',
          'noun',
          'noun',
          'body part',
          'town',
          'adjective',
          'plural noun',
          'adjective',
        ],
      },
    ];
    console.log('hello');
    var filled = [],
      canceled,
      secondPlus,
      i = 0,
      lib = getRandomInt(0, options.length - 1);

    console.log(options[lib]);
    async function newWord() {
      const msg = await message.channel.send(
        `**Please reply with a(n) ${
          options[lib].blanks[i]
        }**\nYou have 2 minutes. *Do not use \`cancel\` as a madlib word, it will cancel the game.*\n\n${progressbar(
          filled.length,
          options[lib].blanks.length,
          12,
          ['<:green:740590536343158844>', '<:red:740591576505385050>']
        )} done`
      );
      await message.channel
        .awaitMessages((m) => m.author.id === message.author.id, {
          max: 1,
          time: 120000,
        })
        .then((collected) => {
          const results = collected.first().content.toLowerCase();
          if (results === 'cancel') {
            canceled = true;
            return;
          }
          filled.push(`**${results}**`);
          msg.delete();
          collected.first().delete();
        });
      i++;

      if (!filled[options[lib].blanks.length - 1]) await newWord();
    }
    await newWord();
    if (canceled) return message.channel.send('Game canceled');
    for (let i = 0; i < filled.length; i++) {
      options[lib].story = options[lib].story.replace(`[${i}]`, filled[i]);
    }
    message.channel.send(`**${options[lib].title}**\n\n${options[lib].story}`);
  },
};
