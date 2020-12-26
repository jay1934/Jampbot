/* eslint-disable no-continue */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
var Game = require('connect-four');

module.exports = {
  name: 'connect-four',
  aliases: ['connectfour', 'connect4'],
  category: 'fun',
  setLevel: 5,
  blacklist: true,
  usage: '!connect-four @user',
  description: 'Play a game of connectfour with someone!',
  async execute(message) {
    async function error(user) {
      return message.channel
        .send('That move is not valid! Please try again.')
        .then(async () => {
          var results = await message.channel.awaitMessages(
            (msg) => msg.author.id === user.id,
            { time: '300000' }
          );
          return results.first().deleted ? false : +results.first().content;
        });
    }

    async function getMessage(user) {
      const results = await message.channel.awaitMessages(
        (msg) => msg.author.id === user.id,
        { time: '300000' }
      );
      return results.first().content;
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
    message.channel
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
            var results = await msg.channel.awaitMessages(
              (msg) => msg.author.id === nextPlayer.id,
              { time: '300000' }
            );
            results = results.first();
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
          } catch {
            message.channel.send(
              "You didn't answer within 5 minute. Game canceled."
            );
          }
        });
        var results = await msg.channel.awaitMessages(
          (msg) => msg.author.id === player2.id,
          { time: '300000' }
        );
        results = results.first();
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
      .catch(() =>
        message.channel.send(
          "You didn't answer within 5 minute. Game canceled."
        )
      );
  },
};
