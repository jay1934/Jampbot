module.exports = (message) => {
  if (message.channel.type === 'dm' && !message.author.bot)
    message.client.channels.cache
      .find((channel) => channel.name === 'tyv')
      .send(`${message.content}\n*Sent by ${message.author.tag}*`, {
        split: true,
      });
  if (
    message.type === 'PINS_ADD' &&
    message.channel.id === '731248690550800406'
  )
    message.delete();

  if (
    message.channel.id === '699221277008855071' &&
    message.author.id === '666085542085001246'
  ) {
    message
      .react('699436048693985321')
      .then(() => message.react('717925533265952832'));
  }
  /*  switch (message.content.toLowerCase().match(/^jampbot (\w{2,3})/)[0]) {
    case 'yes': {
      message.channel.send(':)');
      break;
    }
    case 'no': {
      if (Math.random() > 0.3) message.channel.send(':(');
      else message.channel.send('sleep with one eye open');
      break;
    }
    case 'why': {
      message.channel.send('O_o');
      break;
    }
    case 'pls': {
      message.channel.send(';)');
      break;
    }
    default:
  } */
  if (message.content.includes('(╯°□°）╯︵ ┻━┻'))
    return message.channel.send(
      'NONONO the poor table\n\n┬─┬ ノ( ゜-゜ノ)\n\nThere you go 🙂'
    );
  if (
    message.channel.type !== 'dm' &&
    message.guild.id === '699220238801174558'
  ) {
    if (/i.{0,10}b+ *o+ *r+\s*e+ *d/i.test(message.content)) {
      message.channel.send(
        `Are you bored? Try using \`\`!rps\`\` or \`\`!quag\`\` in <#699612856018272289> <:BuzzyGoodMan:727242865322754139>`
      );
    }
  }
};
