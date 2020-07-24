const Discord = require('discord.js');
const { getRandomArrElement } = require('../utils/functions');

const paperWin = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle('Congratulations! You Win!')
  .setDescription(
    'I played ``rock`` and lost... \n' +
      "I'm sure you were just lucky <:NotLikeThis:717575061468610560>"
  )
  .setFooter('Thanks for playing!');

const paperLose = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Darn! You Lost!')
  .setDescription(
    'I played ``scissors`` and won <:CoolToad:717924925838590012> \n' +
      'Maybe next time. Maybe not.'
  )
  .setFooter('Thanks for playing!');

const rockWin = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle('Congratulations! You Win!')
  .setDescription(
    'I played ``scissors`` and lost... \n' +
      "I'm sure you were just lucky <:NotLikeThis:717575061468610560>"
  )
  .setFooter('Thanks for playing!');

const rockLose = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Darn! You Lost!')
  .setDescription(
    'I played ``paper`` and won <:CoolToad:717924925838590012> \n' +
      'Maybe next time. Maybe not.'
  )
  .setFooter('Thanks for playing!');

const scissorWin = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle('Congratulations! You Win!')
  .setDescription(
    'I played ``paper`` and lost... \n' +
      "I'm sure you were just lucky <:NotLikeThis:717575061468610560>"
  )
  .setFooter('Thanks for playing!');

const scissorLose = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Darn! You Lost!')
  .setDescription(
    'I played ``rock`` and won <:CoolToad:717924925838590012> \n' +
      'Maybe next time. Maybe not.'
  )
  .setFooter('Thanks for playing!');

const rpsTie = new Discord.MessageEmbed()
  .setColor('YELLOW')
  .setTitle('Good Game. We Tied.')
  .setDescription(
    'We both played the same and ended it in a tie <:BabyRage:699953288778350606>'
  )
  .setFooter('Thanks for playing!');

module.exports = {
  name: 'rps',
  blacklist: true,
  async execute(message, args) {
    const replies = ['rock', 'paper', 'scissors'];
    const result = getRandomArrElement(replies);
    const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('You have been challenged to a game of\nRock Paper Scissors')
      .setDescription(
        'Please reply with your move ``(rock, paper, or scissors)``'
      )
      .setFooter("You may reply 'stop' to cancel the game");

    message.channel.send({ embed });

    // First argument is a filter function - which is made of conditions
    // m is a 'Message' object
    message.channel
      .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 30000,
      })
      .then((collected) => {
        // only accept messages by the user who sent the command
        // accept only 1 message, and return the promise after 30000ms = 30s
        if (collected.first().content.toLowerCase() === 'stop') {
          message.reply('game canceled.');
          return;
        }
        if (!replies.includes(collected.first().content.toLowerCase()))
          message.channel.send(
            `❌ Only these responses are accepted: \`${replies.join(
              ', '
            )}\`. Game canceled.`
          );

        // if (message.author.id === "551775030954950672") return message.channel.send({embed: devilishEmbed})

        if (collected.first().content.toLowerCase() === 'rock') {
          if (result === 'rock') {
            return message.channel.send({ embed: rpsTie });
          }
          if (result === 'scissors') {
            return message.channel.send({ embed: rockWin });
          }
          if (result === 'paper') {
            return message.channel.send({ embed: rockLose });
          }
        }

        if (collected.first().content.toLowerCase() === 'scissors') {
          if (result === 'scissors') {
            return message.channel.send({ embed: rpsTie });
          }
          if (result === 'paper') {
            return message.channel.send({ embed: scissorWin });
          }
          if (result === 'rock') {
            return message.channel.send({ embed: scissorLose });
          }
        }

        if (collected.first().content.toLowerCase() === 'paper') {
          if (result === 'paper') {
            return message.channel.send({ embed: rpsTie });
          }
          if (result === 'rock') {
            return message.channel.send({ embed: paperWin });
          }
          if (result === 'scissors') {
            return message.channel.send({ embed: paperLose });
          }
        }
      })
      .catch(() => {
        message.reply('❌ No answer after 30 seconds, game canceled.');
      });
  },
};
