const Discord = require('discord.js');
const {
  getRandomArrElement,
  getReactions,
  getNextMessage,
} = require('../utils/functions');

module.exports = {
  name: 'rps',
  blacklist: true,
  category: 'fun',
  usage: '!rps [@user]',
  description:
    'Starts a rock-paper-scissor game with Jampbot++ (or someone else)',
  async execute(message, args) {
    const player2 =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    const replies = ['rock', 'paper', 'scissors'];
    if (player2 === message.author)
      return message.channel.send(
        "Well that doesn't seem like much fun, does it <:polite:699433623962648576>"
      );
    if (!player2) {
      const result = getRandomArrElement(replies);
      console.log(result);
      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You have been challenged to a game of\nRock Paper Scissors')
        .setDescription(
          'Please reply with your move ``(rock, paper, or scissors)``'
        )
        .setFooter("You may reply 'stop' to cancel the game");

      message.channel.send(embed);

      // First argument is a filter function - which is made of conditions
      // m is a 'Message' object
      message.channel
        .awaitMessages((m) => m.author.id === message.author.id, {
          max: 1,
          time: 30000,
        })
        .then((collected) => {
          const answer = collected.first().content.toLowerCase();
          console.log(answer);
          // only accept messages by the user who sent the command
          // accept only 1 message, and return the promise after 30000ms = 30s
          if (answer === 'stop') {
            message.reply('game canceled.');
            return;
          }
          if (!replies.includes(answer))
            message.channel.send(
              `❌ Only these responses are accepted: \`${replies.join(
                ', '
              )}\`. Game canceled.`
            );

          const rpsTie = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('Good Game. We Tied.')
            .setDescription(
              `We both played \`\`${result}\`\` and ended it in a tie <:BabyRage:699953288778350606>`
            )
            .setFooter('Thanks for playing!');
          if (answer === result) return message.channel.send(rpsTie);
          const rpsWin = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Congratulations! You Win!')
            .setDescription(
              `I played \`\`${result}\`\` and lost... \n` +
                `I'm sure you were just lucky <:NotLikeThis:717575061468610560>`
            )
            .setFooter('Thanks for playing!');

          const rpsLose = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Darn! You Lost!')
            .setDescription(
              `I played \`\`${result}\`\` and won <:CoolToad:717924925838590012> \n` +
                `Maybe next time. Maybe not.`
            )
            .setFooter('Thanks for playing!');
          switch (answer) {
            case 'rock': {
              if (result === 'scissors') return message.channel.send(rpsWin);
              return message.channel.send(rpsLose);
            }

            case 'paper': {
              if (result === 'rock') return message.channel.send(rpsWin);
              return message.channel.send(rpsLose);
            }

            case 'scissors': {
              if (result === 'paper') return message.channel.send(rpsWin);
              return message.channel.send(rpsLose);
            }
            default:
          }
        })
        .catch(() => {
          return message.reply('❌ No answer after 30 seconds, game canceled.');
        });
    } else {
      if (player2.id === '713102337908015227')
        return message.channel.send(
          "No i don't wanna <:BabyRage:699953288778350606>"
        );
      let player1Result;
      let player2Result;
      message.channel.send(
        `You have challenged **${player2.username}**. They have 30 seconds to respond.\n*Please only challenge someone if you know they're online to prevent spam*`
      );
      await player2
        .send(
          `**${message.author.username}** has challenged you to a game of **rock, paper, scissors**! Would you like to accept?`
        )
        .catch((err) => {
          console.log('cp0', err);
          return message.channel.send(
            "It seems I can't DM this user <:hairBotS:733296095022546985>"
          );
        })
        .then(async (msg) => {
          const emoji = await getReactions(msg, player2, '30s', ['👍', '👎']);
          if (emoji === '👍') {
            const msg = await message.channel.send(
              `**${player2.username}** has accepted your challenge! Please check your DMs to continue <:PikaPls:718985469337010206>`
            );
            const embed = new Discord.MessageEmbed()
              .setColor('RED')
              .setTitle(
                'You have been challenged to a game of\nRock Paper Scissors'
              )
              .setDescription(
                'Please reply with your move ``(rock, paper, or scissors)``'
              );
            await message.author
              .send(embed)
              .catch((err) => {
                message.reply(
                  "it seems I can't DM you <:botS:719916354609872926>"
                );
                console.log('cp1', err);
                player2.send(
                  `I couldn't DM ${message.author.username}; game canceled`
                );
                return msg.delete();
              })
              .then(async (msg) => {
                player2.send(
                  `Please be patient while **${message.author.username}** makes their move.`
                );
                const results = await getNextMessage(
                  msg,
                  message.author,
                  '30s'
                );

                if (!replies.includes(results.toLowerCase())) {
                  message.author.send(
                    `❌ Only these responses are accepted: \`${replies.join(
                      ', '
                    )}\`. Game canceled.`
                  );
                  player2.send(
                    `**${message.author.username}** didn't answer correctly; game canceled <:botS:719916354609872926>`
                  );
                  return message.channel.send(
                    `**${message.author.username}** didn't answer correctly; game canceled <:botS:719916354609872926>`
                  );
                }
                player1Result = results.toLowerCase();
                message.author.send(
                  `You have played **${results.toLowerCase()}**. Please be patient while **${
                    player2.username
                  }** makes their move.`
                );
              })
              .catch((err) => {
                console.log('cp2', err);
                message.author.send(
                  '❌ No answer after 30 seconds, game canceled.'
                );
                message.channel.send(
                  `**${message.author.username}** gave no answer after 30 seconds, game canceled.`
                );
                return player2.send(
                  `**${message.author.username}** gave no answer after 30 seconds, game canceled.`
                );
              });
            await player2
              .send(embed)
              .then(async (msg) => {
                const results = await getNextMessage(msg, player2, '30s');

                if (!replies.includes(results.toLowerCase())) {
                  player2.send(
                    `❌ Only these responses are accepted: \`${replies.join(
                      ', '
                    )}\`. Game canceled.`
                  );
                  message.author.send(
                    `**${player2.username}** didn't answer correctly; game canceled <:botS:719916354609872926>`
                  );
                  return message.channel.send(
                    `**${player2.username}** didn't answer correctly; game canceled <:botS:719916354609872926>`
                  );
                }
                player2Result = results.toLowerCase();
                player2.send(`You have played **${results.toLowerCase()}**.`);
              })
              .catch((err) => {
                console.log('cp3', err);
                player2.send('❌ No answer after 30 seconds, game canceled.');
                message.channel.send(
                  `**${message.author.username}** gave no answer after 30 seconds, game canceled.`
                );
                return message.author.send(
                  `**${message.author.username}** gave no answer after 30 seconds, game canceled.`
                );
              });

            const rpsTie = new Discord.MessageEmbed()
              .setColor('YELLOW')
              .setTitle('Good Game. You Tied.')
              .setDescription(
                `Both of you played \`\`${player2Result}\`\` and ended it in a tie <:BabyRage:699953288778350606>`
              )
              .setFooter('Thanks for playing!');

            const rpsWin1 = new Discord.MessageEmbed()
              .setColor('GREEN')
              .setTitle('Congratulations! You Win!')
              .setDescription(
                `**${player2.username}** played \`\`${player2Result}\`\` and lost...\nWOOOOOOOOOOOOOOO <:JuzHype:717925533265952832>`
              )
              .setFooter('Thanks for playing!');

            const rpsWin2 = new Discord.MessageEmbed()
              .setColor('GREEN')
              .setTitle('Congratulations! You Win!')
              .setDescription(
                `**${message.author.username}** played \`\`${player1Result}\`\` and lost...\nWOOOOOOOOOOOOOOO <:JuzHype:717925533265952832>`
              )
              .setFooter('Thanks for playing!');

            const rpsWin3 = new Discord.MessageEmbed()
              .setColor('GREEN')
              .setTitle(`${message.author.username} won!`)
              .setDescription(
                `**${message.author.username}** played \`\`${player1Result}\`\`, and **${player2.username}** played \`\`${player2Result}\`\``
              )
              .setFooter('Good game to both of you!');

            const rpsWin4 = new Discord.MessageEmbed()
              .setColor('GREEN')
              .setTitle(`${player2.username} won!`)
              .setDescription(
                `**${player2.username}** played \`\`${player2Result}\`\`, and **${message.author.username}** played \`\`${player1Result}\`\``
              )
              .setFooter('Good game to both of you!');

            const rpsLose1 = new Discord.MessageEmbed()
              .setColor('RED')
              .setTitle('Darn! You Lost!')
              .setDescription(
                `**${player2.username}** played \`\`${player2Result}\`\` and won <:NotLikeThis:717575061468610560>\nMaybe next time. Maybe not.`
              )
              .setFooter('Thanks for playing!');

            const rpsLose2 = new Discord.MessageEmbed()
              .setColor('RED')
              .setTitle('Darn! You Lost!')
              .setDescription(
                `**${message.author.username}** played \`\`${player1Result}\`\` and won <:NotLikeThis:717575061468610560>\nMaybe next time. Maybe not.`
              )
              .setFooter('Thanks for playing!');

            if (player1Result === player2Result) {
              message.author.send(rpsTie);
              player2.send(rpsTie);
              return message.channel.send(rpsTie);
            }
            switch (player1Result) {
              case 'rock': {
                if (player2Result === 'paper') {
                  player2.send(rpsWin2);
                  message.author.send(rpsLose1);
                  return message.channel.send(rpsWin4);
                }
                player2.send(rpsLose2);
                message.author.send(rpsWin1);
                return message.channel.send(rpsWin3);
              }

              case 'paper': {
                if (player2Result === 'scissors') {
                  player2.send(rpsWin2);
                  message.author.send(rpsLose1);
                  return message.channel.send(rpsWin4);
                }
                player2.send(rpsLose2);
                message.author.send(rpsWin1);
                return message.channel.send(rpsWin3);
              }

              case 'scissors': {
                if (player2Result === 'rock') {
                  player2.send(rpsWin2);
                  message.author.send(rpsLose1);
                  return message.channel.send(rpsWin4);
                }
                player2.send(rpsLose2);
                message.author.send(rpsWin1);
                return message.channel.send(rpsWin3);
              }

              default:
            }
          } else if (emoji === '👎') {
            player2.send(
              `You have rejected ${message.author.username}'s request.`
            );
            message.reply(
              `${player2.username} has rejected your request <:NotLikeThis:717575061468610560>`
            );
          } else console.log(emoji);
        })
        .catch((err) => {
          console.log('cp4', err);
          player2.send('❌ No answer after 30 seconds, game canceled.');
          message.channel.send(
            `**${player2.username}** gave no answer after 30 seconds, game canceled.`
          );
          return message.author.send(
            `**${player2.username}** gave no answer after 30 seconds, game canceled.`
          );
        });
    }
  },
};
