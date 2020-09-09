/* eslint-disable no-continue */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
var Game = require('connect-four');
const { getNextMessage } = require('../../utils/functions');

module.exports = {
  name: 'connect-four',
  aliases: ['connectfour', 'connect4'],
  category: 'fun',
  setLevel: 5,
  blacklist: true,
  usage: '!connect-four @user',
  description: 'Play a game of connectfour with someone!',
  async execute(message, args, log) {
    async function error(user) {
      return message.channel
        .send('That move is not valid! Please try again.')
        .then(async () => {
          const results = await getNextMessage(
            message.channel,
            user,
            '5m',
            true
          );
          try {
            results.delete();
          } catch {
            return false;
          }
          return +results.content;
        });
    }

    async function getMessage(user) {
      return getNextMessage(message.channel, user, '5m');
    }
    var player1 = message.author;
    var player2 = message.mentions.users.first();
    if (!player2)
      return message.channel.send(
        "Please ping someone to play with! Make sure they're online to prevent spam."
      );
    if (player2 === player1)
      return message.channel.send(
        "Well that doesn't seem like much fun, does it <:polite:699433623962648576>"
      );
    var id1 =
        player1.username === player2.username ? player1.tag : player1.username,
      id2 =
        player2.username === player1.username ? player2.tag : player2.username;
    var game = new Game();
    var board = [
      ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
      ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
      ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
      ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
      ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
      ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
    ];
    const msg = await message.channel
      .send(
        `**${id2}**, it's your move! Please respond with a column (1-7). Respond \`cancel\` at any time.`
      )
      .then(async (msg) => {
        game.on('play', async (player, coords) => {
          board[coords.row][+coords.col] = player === id1 ? '🔵' : '🔴';
          if (game.ended) {
            msg.delete();
            message.channel.send(
              `${
                game.winner
                  ? `**${game.winner}**, you won <:JuzHype:717925533265952832>`
                  : `It was a tie you're both little timmys at this game <:NotLikeThis:717575061468610560>`
              }\n\nFinal board:\n${board
                .reverse()
                .map((arr) => arr.join(''))
                .join('\n')}`
            );
            return;
          }
          var nextPlayer = player === id1 ? player2 : player1;
          var nextPlayerID = player === id1 ? id2 : id1;
          msg.edit(
            `**${nextPlayerID}**, it's your move! Respond \`cancel\` at any time.\n\n${board
              .reverse()
              .map((arr) => arr.join(''))
              .join('\n')}`
          );
          board.reverse();
          try {
            var results = await getNextMessage(
              msg.channel,
              nextPlayer,
              '5m',
              true
            );
            while (true) {
              if (results.content === 'cancel')
                return message.channel.send('Game canceled');
              if (Number.isNaN(+results.content)) {
                results.content = await getMessage(nextPlayer);
                continue;
              }
              results.delete();
              if (results.content === false) return;
              if (!game.validMove(+results.content - 1))
                results.content = await error(nextPlayer, game);
              else break;
            }
            game.play(nextPlayerID, +results.content - 1);
          } catch (e) {
            console.log(e);
            message.channel.send(
              "You didn't answer within 5 minute. Game canceled."
            );
          }
        });
        var results = await getNextMessage(msg.channel, player2, '5m', true);
        while (true) {
          if (results.content === 'cancel')
            return message.channel.send('Game canceled');

          if (Number.isNaN(+results.content)) {
            results.content = await getMessage(player2);
            continue;
          }
          results.delete();
          if (results.content === false) return;
          if (!game.validMove(+results.content - 1))
            results.content = await error(player2, game);
          else break;
        }
        game.play(id2, +results.content - 1);
      })
      .catch((err) => {
        console.log(err);
        message.channel.send(
          "You didn't answer within 5 minute. Game canceled."
        );
      });
  },
};
