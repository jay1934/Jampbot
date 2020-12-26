const { MessageEmbed } = require('discord.js');

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
    let question = args.join(' ');
    question = question.substring(0, 1).toUpperCase() + question.substring(1);

    if (/^is creamy creepy\?$/i.test(question))
      return message.channel.send(
        new MessageEmbed()
          .setTitle('The 8Ball has Spoken')
          .setColor('RED')
          .addField('Question:', 'Is Creamy creepy?')
          .addField('Answer:', 'Incredibly.')
      );

    if (/^(who is|is lemmy) the best koopaling\?$/i.test(question))
      return message.channel.send(
        new MessageEmbed()
          .setTitle('The 8Ball has Spoken')
          .setColor('RED')
          .addField('Question:', question)
          .addField(
            'Answer:',
            'Lemmy is undoubtedly the best koopaling ~~solely because you can play with his balls~~'
          )
      );

    message.channel.send(
      new MessageEmbed()
        .setTitle('The 8Ball has Spoken')
        .setColor('RED')
        .addField('Question:', question)
        .addField('Answer:', replies.sample())
    );
  },
};
