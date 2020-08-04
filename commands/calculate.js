const math = require('mathjs');

module.exports = {
  name: 'calculate',
  aliases: ['calc'],
  category: 'misc',
  usage: '!calculate <expression>',
  description: 'Evaluates a mathematical expression',
  async execute(message, args) {
    if (!args[0])
      return message.channel.send(
        `Please specify an expression to evaluate.\nCorrect usage: \`\`${this.usage}\`\``
      );

    try {
      const evaluated = math.evaluate(args.slice(0).join(' ')).toString();
      return message.channel
        .send(evaluated)
        .catch(() => message.channel.send('Invalid expression.'));
    } catch {
      return message.channel.send('Invalid expression.');
    }
  },
};
