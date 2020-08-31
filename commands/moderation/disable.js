const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'disable',
  aliases: ['enable'],
  ownerOnly: true,
  helpIgnore: true,
  async execute(message, args) {
    const guild = await require('../../models/guilds').findOne({
      GuildID: message.guild.id,
    });
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!guild) return;
    if (message.content.startsWith('!disable')) {
      if (!commandName)
        return message.channel.send(
          "❌ You didn't pass any command to disable.\nCorrect usage: ``!disable <command name or alias>``"
        );
      if (!command)
        return message.channel.send(
          `❌ There is no command with the name or alias \`\`${commandName}\`\`.\nCorrect usage: \`\`!disable <command name or alias>\`\``
        );
      if (command.name === 'disable' || command.name === 'enable') return;
      message.channel.send(
        new MessageEmbed()
          .setColor('GREEN')
          .setTitle(`\`${command.name}\` successfully disabled`)
      );

      if (!guild.Disabled) guild.Disabled = '';
      guild.Disabled.push(command.name);
      console.log('cp1', guild.Disabled);
      guild.save();
      console.log(guild.Disabled);
    } else {
      if (!commandName)
        return message.channel.send(
          "❌ You didn't pass any command to disable.\nCorrect usage: ``!enable <command name or alias>``"
        );
      if (!command)
        return message.channel.send(
          `❌ There is no command with the name or alias \`\`${commandName}\`\`.\nCorrect usage: \`\`!enable <command name or alias>\`\``
        );
      if (command.name === 'disable') return;
      if (!guild.Disabled.includes(command.name))
        return message.channel.send(`\`\`${command.name}\`\` is not disabled!`);
      message.channel.send(
        new MessageEmbed()
          .setColor('GREEN')
          .setTitle(`\`${command.name}\` successfully enabled`)
      );

      guild.Disabled = guild.Disabled.filter((cmd) => cmd !== command.name);
      guild.save();
    }
  },
};
