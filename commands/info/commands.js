const Discord = require('discord.js');
const {
  toFirstUpperCase,
  hasRole,
  getGuild,
  arrMove,
} = require('../../utils/functions');

module.exports = {
  name: 'commands',
  helpIgnore: true,
  async execute(message, args) {
    const { commands } = message.client;

    /* command object example:

      {
      name: 'command'
      usage: '!command <text>
      category: 'fun'
      }

    */

    var cat = commands
      .filter((command) => command.category)
      .map((command) => command.category);

    cat = Array.from(new Set(cat));

    cat = arrMove(cat, cat.indexOf('moderation'), cat.length - 1);

    for (var category of cat) {
      const funData = commands
        .filter(
          // eslint-disable-next-line no-loop-func
          (command) =>
            command.category === category &&
            !command.disabled &&
            !command.helpIgnore &&
            command.usage &&
            command.description
        )
        .map(
          (command) =>
            `**${toFirstUpperCase(command.name)}**\n\`\`${command.usage}\`\`\n${
              command.description
            }`
        )
        .sort()
        .join('\n\n')
        .toString()
        .match(/\*[\s\S]+?(?=(?:\*\*\w+\*\*|$))/g);
      var y = 0;
      var funSplit = [];
      funSplit = [];
      for (var i = 0; i < funData.length; i++) {
        funSplit[y] = funSplit[y] ? funSplit[y] + funData[i] : funData[i];
        if (funSplit[y].length > 2048) {
          funSplit[y] = funSplit[y].replace(funData[i], '');
          y++;
          funSplit[y] = funData[i];
        }
      }
      var embed = new Discord.MessageEmbed()
        .setTitle(`${toFirstUpperCase(category)} Commands`)
        .setColor('RANDOM')
        .setFooter(
          'Everything within <> is necessary, anything in [] is optional. Do not include the symbols in the command.'
        );
      if (
        category !== 'moderation' ||
        (category === 'moderation' &&
          hasRole(
            getGuild('Team Jamp', message).members.cache.get(message.author.id),
            'Jampolice'
          ))
      ) {
        for (var l = 0; funSplit[l]; l++) {
          embed.setDescription(funSplit[l]);
          message.author.send(embed).catch(() => {
            return message.channel.send(
              "It doesn't look like I can DM you <:FeelsBuzzyMan:727242758338904064>"
            );
          });
        }
      }
    }
    const dEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Jampbot Deluxe Commands')
      .setDescription(
        `**An in-depth list of Jampbot Deluxe commands can be found [here](https://makerteams.net/features)**`
      );
    await message.author
      .send(dEmbed)
      .then(() => message.react('717756118134423602'));
  },
};
