const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'commands',
  helpIgnore: true,
  async execute(message) {
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
      .map((command) => command.category)
      .cleanse();

    for (var category of cat) {
      const funData = commands
        .filter(
          // eslint-disable-next-line no-loop-func
          (command) =>
            command.category === category &&
            !command.disabled &&
            !command.helpIgnore &&
            !command.exclusive &&
            command.usage &&
            command.description &&
            require('../../models/guilds').findOne(
              { GuildID: message.guild.id },
              (err, res) => {
                return !res.Disabled.includes(command.name);
              }
            )
        )
        .map(
          (command) =>
            `**${command.name.toFirstUpperCase()}**\n\`\`${
              command.usage
            }\`\`\n${command.description}`
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
      var embed = new MessageEmbed()
        .setTitle(`${category.toFirstUpperCase()} Commands`)
        .setColor('RANDOM')
        .setFooter(
          'Everything within <> is necessary, anything in [] is optional. Do not include the symbols in the command.'
        );
      if (
        category !== 'moderation' ||
        (category === 'moderation' &&
          message.member.roles.cache.has('699669246476812288'))
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
    const dEmbed = new MessageEmbed()
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
