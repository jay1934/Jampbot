/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
const Game = require('hangman-game-engine');
const request = require('request');
const { MessageEmbed } = require('discord.js');
const {
  getNextMessage,
  toFirstUpperCase,
  getReactions,
} = require('../../utils/functions');

module.exports = {
  name: 'hangman',
  aliases: ['hangmab'],
  category: 'fun',
  usage: '!hangman',
  setLevel: 5,
  description: 'Play a game of hangman!',
  async execute(message, args, log) {
    async function getMessage() {
      return getNextMessage(message.channel, message.author, '5m');
    }
    async function error() {
      return message.channel
        .send('You already played that letter! Please try again.')
        .then(async () => {
          const results = await getNextMessage(
            message.channel,
            message.author,
            '5m'
          );
          return results;
        });
    }
    var word;
    var target = message.mentions.users.first();
    if (!target) {
      target = message.author;
      var options = {
        method: 'GET',
        url:
          'https://wordsapiv1.p.rapidapi.com/words/?frequencyMax=2.5&lettersMin=5&hasDetails=inCategory,partOfSpeech,definition&limit=1&random=true',
        headers: {
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
          'x-rapidapi-key':
            '28499b2b45mshbc698a620aa03f2p1105e5jsnb12d4fd5d2cf',
          useQueryString: true,
        },
      };
      function doRequest(url) {
        return new Promise(function (resolve, reject) {
          request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
              resolve(body);
            } else {
              reject(error);
            }
          });
        });
      }
      word = JSON.parse(await doRequest(options));
      word.results = word.results.find(
        ({ partOfSpeech, inCategory }) => partOfSpeech && inCategory
      );
      const {
        results: {
          inCategory: [inCategory],
        },
      } = word;
      word.results.inCategory = inCategory;
    } else {
      if (
        target.id === message.author.id ||
        target.id === message.client.user.id
      )
        return message.channel.send('smh no');

      word = {
        results: {},
      };
      await target
        .send(
          new MessageEmbed()
            .setColor('GREEN')
            .setTitle(
              `**${message.author.username}** chalenged you to a game of multiplayer hangman`
            )
            .setDescription('Do you accept?')
        )
        .catch((err) => {
          console.log(err);
          message.channel.send("It seems that I can't DM this user");
        })
        .then(async (msg) => {
          message.channel.send(
            `A game request was sent to ${target.username}, please refer to your DMs for the next steps.`
          );
          const emoji = await getReactions(msg, target, '30s', ['✅', '❌']);
          if (emoji === '❌') {
            target.send('You have succesfully declined');
            message.author.send(
              `Unfortunately, ${target.username} declined your offer`
            );
            return message.channel.send(
              `${target.username} declined the offer`
            );
          }
          target.send(
            `You have succesfully accepted! Please refer back to Team Jamp, and wait while ${message.author.username} chooses your word.`
          );
          message.channel.send(`${target.username} accepted the offer!`);
          await message.author
            .send(
              new MessageEmbed()
                .setColor('GREEN')
                .setTitle(
                  `${target.username} accepted the offer! Please respond with your chosen word.`
                )
                .setDescription(
                  `Please keep in mind that ${target.username} will only have **6** wrong guesses before game over. Don't make the word too easy, or too hard!`
                )
                .addField(
                  'Requirements',
                  'Your word must be under 20 characters and use only a-z letters (no spaces or hyphens) or the game will be immediately canceled.'
                )
                .setFooter('For the interest of time, you have 5 minutes.')
            )
            .catch(() =>
              message.channel.send(
                `It seems I cant send a DM to ${message.author.user}. Game canceled.`
              )
            )
            .then(async (msg) => {
              var results = await getNextMessage(
                msg.channel,
                message.author,
                '5m'
              );
              if (results.length > 20 || !/[a-z]/i.test(results)) {
                message.author.send(
                  'Your word does not follow the requirements. Game canceled.'
                );
                return message.channel.send(
                  `${message.author.username}'s word did not follow the requirements, the game has been canceled.`
                );
              }
              word.word = results.toLowerCase();
              message.author.send(
                new MessageEmbed()
                  .setColor('GREEN')
                  .setTitle(
                    'What part of speech is this word? For example, adjective, noun, etc.'
                  )
                  .setFooter('For the interest of time, you have one minute.')
              );
              results = await getNextMessage(msg.channel, message.author, '1m');
              word.results.partOfSpeech = results;
              message.author.send(
                new MessageEmbed()
                  .setColor('GREEN')
                  .setTitle(
                    'What category does your word fit in to? For example, algebra fits in to math'
                  )
                  .setFooter('For the interest of time, you have one minute.')
              );
              results = await getNextMessage(msg.channel, message.author, '1m');
              word.results.inCategory = results;
              message.author.send(
                new MessageEmbed()
                  .setColor('GREEN')
                  .setTitle('Please provide a short definition of your word.')
                  .setFooter('For the interest of time, you have three minutes')
              );
              results = await getNextMessage(msg.channel, message.author, '3m');
              word.results.definition = results;
              message.author.send(
                `Please refer back to Team Jamp to watch ${target.username} try to guess your word!`
              );
            })
            .catch((err) => {
              message.author.send(
                "You didn't respond in the alloted time! Game canceled."
              );
              message.channel.send(
                `${message.author.username} didn't pick a word in the alloted time. Game canceled.`
              );
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          message.channel.send(
            `${target.username} didn't respond in 30 seconds. Game canceled. <@${message.author.id}>, please make sure a user is online before you request to play with them t prevent spam.`
          );
          target.send("You didn't respond in 30 seconds. Game canceled.");
        });
    }
    if (
      !word ||
      !word.word ||
      !word.results.definition ||
      !word.results.partOfSpeech ||
      !word.results.inCategory
    )
      return;
    const game = new Game(word.word, { maxAttempt: 6 });
    message.author = target;
    message.channel
      .send(
        `<@${
          target.id
        }>, Welcome to a new game of Hangman! Respond \`cancel\` at any time.\n\n**Hangman Word:** \`${game.hiddenWord.join(
          ' '
        )}\`\n**Part of Speech:** ${
          word.results.partOfSpeech
        }\n**Guessed Letters:** \`${game.guessedLetters.join(
          ', '
        )}\`\n**Incorrect Guess Left:** ${
          6 - game.failedGuesses
        }\n\n**Please respond with a letter!**`
      )
      .then(async (msg) => {
        async function play(game, msg) {
          msg.delete();
          if (game.status !== 'IN_PROGRESS')
            return game.status === 'WON'
              ? message.channel.send(
                  `Congratulations; You win!\n\n**Finished Word:** \`${game.hiddenWord.join(
                    ''
                  )}\`\n**Word Definition:** ${toFirstUpperCase(
                    word.results.definition
                  )}\n**Guessed Letters:** \`${game.guessedLetters.join(
                    ', '
                  )}\`\n**Incorrect Guesses:** ${
                    game.failedGuesses
                  }\n\n<:JuzHype:717925533265952832><:JuzHype:717925533265952832><:JuzHype:717925533265952832><:JuzHype:717925533265952832><:JuzHype:717925533265952832>`
                )
              : message.channel.send(
                  `You lost <:NotLikeThis:717575061468610560>\n\n**Your Word:** \`${game.hiddenWord.join(
                    ' '
                  )}\`\n**Actual Word:** \`${
                    word.word
                  }\`\n**Word Definition:** ${toFirstUpperCase(
                    word.results.definition
                  )}\n**Guessed Letters:** \`${game.guessedLetters.join(
                    ', '
                  )}\``
                );
          message.channel
            .send(
              `**Hangman Word So Far:** \`${game.hiddenWord.join(' ')}\`${
                game.failedGuesses > 2
                  ? `\n**Word Category:** ${toFirstUpperCase(
                      word.results.inCategory
                    )}`
                  : ''
              }\n**Part of Speech:** ${
                word.results.partOfSpeech
              }\n**Guessed Letters:** \`${game.guessedLetters.join(
                ', '
              )}\`\n**Incorrect Guess Left:** ${
                6 - game.failedGuesses
              }\n\n**Please respond with a letter!** Respond \`cancel\` at any time.`
            )
            .then(async (msg) => {
              var results = await getNextMessage(
                message.channel,
                message.author,
                '5m'
              );
              while (true) {
                if (results === 'cancel')
                  return message.channel.send('Game canceled.');
                if (!/^[a-z]$/.test(results)) {
                  results = await getMessage();
                  continue;
                }
                if (game.guessedLetters.includes(results))
                  results = await error();
                else break;
              }
              play(game.guess(results), msg);
            })
            .catch((err) => {
              console.log(err);
              message.channel.send('You did not play a letter in time!');
            });
        }
        var results = await getNextMessage(
          message.channel,
          message.author,
          '5m'
        );
        while (true) {
          if (results === 'cancel')
            return message.channel.send('Game canceled.');
          if (!/^[a-z]$/.test(results)) {
            results = await getMessage();
            continue;
          }
          if (game.guessedLetters.includes(results)) results = await error();
          else break;
        }
        play(game.guess(results), msg);
      })
      .catch((err) => {
        console.log(err);
        message.channel.send('You did not play a letter in time!');
      });
  },
};
