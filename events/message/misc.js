const config = require('../../config.json');
const { getChannel } = require('../../utils/functions');

module.exports = (message) => {
  const newTimeCounter = new Set();
  if (message.channel.type === 'dm' && !message.author.bot)
    getChannel('tyv', message.client).send(
      `${message.content}\n*Sent by ${message.author.tag}*`,
      {
        split: true,
      }
    );
  if (
    message.type === 'PINS_ADD' &&
    message.channel.id === config.channelID.notes
  )
    message.delete();

  if (
    message.channel.id === '699221277008855071' &&
    message.author.id === config.deluxe
  ) {
    message
      .react('699436048693985321')
      .then(() => message.react('717925533265952832'));
  }
  if (message.content.toLowerCase() === 'jampbot yes')
    message.channel.send(':)');
  if (message.content.toLowerCase() === 'jampbot no') {
    if (Math.random() > 0.3) message.channel.send(':(');
    else message.channel.send('sleep with one eye open');
  }
  if (message.content.toLowerCase() === 'jampbot why')
    message.channel.send('O_o');
  if (message.content.toLowerCase() === 'jampbot pls')
    message.channel.send(';)');
  if (message.content.includes('(╯°□°）╯︵ ┻━┻'))
    return message.channel.send(
      'NONONO the poor table\n\n┬─┬ ノ( ゜-゜ノ)\n\nThere you go 🙂'
    );
  // if message includes some form of 'im' bored, send a remind that *you can use !rps to play rock paper scissors* ;)
  const found = message.content
    .toLowerCase()
    .match(/i.{0,10}b+\s*o+\s*r+\s*e+\s*d/);
  if (found && !newTimeCounter.has('cooldown')) {
    // eslint-disable-next-line no-redeclare
    newTimeCounter.add('cooldown');
    message.channel.send(
      `Are you bored? Try using \`\`!rps\`\` or \`\`!quag\`\` in <#${config.channelID.spam}> <:BuzzyGoodMan:727242865322754139>`
    );
    setTimeout(function () {
      newTimeCounter.delete('cooldown');
    }, 1800000);
  }
};
