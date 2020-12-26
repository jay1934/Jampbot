module.exports = {
  name: 'source',
  category: 'info',
  usage: '!source',
  descriptions: 'Displays links to Jampbot++ and Jampbot Deluxe source code',
  async execute(message) {
    message.channel.send(
      'Jampbot Deluxe source code: <https://github.com/TeamShellSMM/ShellBot3000>\nJampbot++ source code: <https://github.com/Lioness100/Jampbot>'
    );
  },
};
