const { MessageEmbed } = require('discord.js');

const func = '';
module.exports = {
  name: 'test',
  args: 'hello <friend> | goodbye [buddy]',
  ownerOnly: true,
  helpIgnore: true,
  async execute(message) {
    let count = 1;
    (async function recursive(msg) {
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Some Prompt #${count++}`);
      const next = await (msg ? msg.edit(embed) : message.channel.send(embed));
      (await message.channel.awaitMessages(() => true, { max: 1 }))
        .first()
        .delete();
      recursive(next);
    })();
  },
};

console.log('Hello');
