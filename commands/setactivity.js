module.exports = {
  name: 'setactivity',
  ownerOnly: true,
  async execute(message, args) {
    const playing = args[0];
    if (!playing)
      return message.channel.send('❌ What I should be doing senpai');
    if (!args[1])
      return message.channel.send('❌ What should I be playing senpai');
    if (playing !== 'playing' && playing !== 'Playing')
      return message.channel.send(
        '❌ I can only use the ``playing`` status <:NotLikeThis:717575061468610560>'
      );
    const actividade = args.slice(1).join(' ') || 'Jamp Levels';
    if (actividade) {
      message.client.user.setActivity(actividade, {
        type: 'PLAYING',
        url: 'https://makerteams.net/teamjamp',
      });
      message.channel.send(
        `Succesfully changed my activity status to **Playing ${actividade}**`
      );
    } else {
      message.channel.send('❌ smh something went wrong');
    }
  },
};
