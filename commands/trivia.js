// In development

const { MessageEmbed } = require('discord.js');
const { getRandomArrElement } = require('../utils/functions');

const questions = [
  {
    title:
      'Which of the following is the best Mario Maker 2 Team <:mi_emote_o:717925349299585035>',
    options: ['Team Jamp', 'Team Shell', 'Team Pipe', 'Team Precision'],
    explanation:
      '**Team Jamp** was founded on April 13, 2020, and has since arisen to become the objectively best Mario Maker 2 Team.',
    correct: 1,
    time: 10000,
    cErr:
      "Incorrect. I can't believe you would say such a thing <:What:717592758436757514>",
  },
  {
    title:
      'Which of the following enemies are not depicted in the Mario Maker 2 cover art?',
    options: [
      'A Winged Boom Boom',
      'A Spiny',
      'A Hammerbro',
      'A Piranha Plant',
    ],
    explanation:
      'The cover art shows many enemies, such as bullet bills, winged goombas, and koopa troopas. However, there are (luckily) no **hammerbros** to be seen.',
    correct: 3,
    time: 10000,
  },
  {
    title:
      'What viral level from SMM1 by Phenotype focused around RNG had a 1 in 7.5 million chance to be cleared?',
    options: ['Lucky Spin', 'Lucky Pick', 'Lucky Chance', 'Lucky Draw'],
    explanation:
      '**Lucky Draw** was an incredibly popular level released on October 29th, 2018, using Magikoopa RNG to create a seemingly impossible course.',
    correct: 4,
    time: 10000,
  },
  {
    title: 'When was Mario Maker 2 released?',
    options: [
      'June 28th, 2018',
      'July 18th, 2018',
      'June 20th, 2018',
      'July 8th, 2018',
    ],
    explanation:
      'Mario Maker 2 was released on **June 28th, 2018**, after being announced at E3 five months before.',
    correct: 1,
    time: 15000,
  },
  {
    title:
      'Which Mario Maker 2 player tops the Endless Super Expert leaderboard with an insane high score of over 9400?',
    options: ['Nokduro', 'Celes!', 'Thabeast', 'Vins6708'],
    explanation:
      '**Celes!** is an insane Mario Maker player with the current gold ribbon in the Endless Super Expert leaderboard, as well as gold medals in other Endless categories.',
    correct: 2,
    time: 15000,
  },
  {
    title:
      'What Mario Maker 1 event hosted by a popular twitch streamer featured levels by Fritzef, Freakin HA, Hoagie, Revolv, and Hae°ж°fly?',
    options: [
      'Get Peach or Die Trying',
      'Kaizo Wars 4',
      'Kaizo Battleground',
      '3YMM',
    ],
    explanation:
      '**Get Peach or Die Trying (GPODT)** was a live tournament hosted by TheIncrediblePaco, a popular twitch streamer, featuring 16 racers such as Thabeast, Syun, Vellhart, and Ryukahr, and 20 different levels by popular creators.',
    correct: 1,
    time: 10000,
  },
];
module.exports = {
  name: 'trivia',
  rolePermission: 'Jampolice',
  guildOnly: true,
  blacklist: true,
  disabled: true,
  async execute(message, args) {
    const q = getRandomArrElement(questions);
    let i = 0;
    const Embed = new MessageEmbed()
      .setTitle(q.title)
      .setAuthor(
        `Reply to this message with the correct question number! You have ${
          q.time / 1000
        } seconds.`
      )
      .setDescription(
        q.options.map((opt) => {
          i++;
          return `${i} - ${opt}\n`;
        })
      )
      .setColor(`GREEN`)
      .setFooter(`Reply 'cancel' to cancel.`);
    message.channel.send(Embed);
    if (!q.cErr) q.cErr = 'Incorrect answer <:SadPog:710543485849174067>';
    try {
      const msgs = await message.channel.awaitMessages(
        (u2) => u2.author.id === message.author.id,
        { time: q.time, max: 1, errors: ['time'] }
      );
      if (msgs.first().content === 'cancel') {
        message.channel.send(`Game canceled`);
        return;
      }
      // eslint-disable-next-line eqeqeq
      if (parseInt(msgs.first().content) == q.correct) {
        return message.channel.send(`You got it correct! ${q.explanation}`);
      }
      return message.channel.send(q.cErr);
    } catch (e) {
      return message.channel.send(
        `You did not answer within ${q.time / 1000} seconds!`
      );
    }
  },
};
