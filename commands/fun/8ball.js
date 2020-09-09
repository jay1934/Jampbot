const Discord = require('discord.js');
const prefix = require('../../config');
const { getRandomArrElement } = require('../../utils/functions');

module.exports = {
  name: '8ball',
  blacklist: true,
  noPing: true,
  category: 'fun',
  usage: '!8ball <question>',
  description: 'Ask almighty 8ball a question',
  execute(message, args) {
    if (!args[0] || !/^\w/.test(args[0]))
      return message.channel.send(
        '❌ Please ask a full question.\nCorrect usage: ``!8ball enter question here``'
      );
    const replies = [
      'Maybe.',
      'Certainly not.',
      'I hope so.',
      'Not in your wildest dreams.',
      'There is a good chance.',
      'Quite likely.',
      'I think so.',
      'I hope not.',
      'I hope so.',
      'Never!',
      'Pfft.',
      'Sorry, bucko.',
      'Hell, yes.',
      'Hell to the no.',
      'The future is bleak.',
      'The future is uncertain.',
      'I would rather not say.',
      'Who cares?',
      'Possibly.',
      'Never, ever, ever.',
      'There is a small chance.',
      'Yes!',
      'lol no.',
      'There is a high probability.',
      'What difference does it makes?',
      'Not my problem.',
      'Ask someone else.',
      'All I know is madlad go brrrrrr',
      'I ethically disagree',
    ];
    const question = args.slice(0).join(' ');
    const questionsLower = question.toLowerCase();
    const questionsTest =
      questionsLower.substring(0, 1).toUpperCase() +
      questionsLower.substring(1);
    const creamyRig = new Discord.MessageEmbed()
      .setTitle('The 8Ball has Spoken')
      .setColor('RED')
      .addField('Question:', 'Is Creamy creepy?')
      .addField('Answer:', 'Incredibly.');
    const lemmyRig = new Discord.MessageEmbed()
      .setTitle('The 8Ball has Spoken')
      .setColor('RED')
      .addField('Question:', questionsTest)
      .addField(
        'Answer:',
        'Lemmy is undoubtedly the best koopaling ~~solely because you can play with his balls~~'
      );
    const embed = new Discord.MessageEmbed()
      .setTitle('The 8Ball has Spoken')
      .setColor('RED')
      .addField('Question:', questionsTest)
      .addField('Answer:', getRandomArrElement(replies));
    if (
      questionsLower === 'is creamy creepy' ||
      questionsLower === 'is creamy creepy?'
    )
      return message.channel.send({ embed: creamyRig });
    if (
      questionsLower === 'who is the best koopaling' ||
      questionsLower === 'who is the best koopaling?' ||
      questionsLower === 'is lemmy the best koopaling' ||
      questionsLower === 'is lemmy the best koopaling?'
    )
      return message.channel.send({ embed: lemmyRig });

    message.channel.send({ embed });
  },
};
