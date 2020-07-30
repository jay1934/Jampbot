module.exports = {
  name: 'reload',
  aliases: ['r'],
  helpIgnore: true,
  ownerOnly: true,
  execute(message, args) {
    if (!args.length)
      return message.channel.send(
        "❌ You didn't pass any command to reload.\nCorrect usage: ``!reload <command name or alias>``"
      );
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command)
      return message.channel.send(
        `❌ There is no command with the name or alias \`\`${commandName}\`\`.\nCorrect usage: \`\`!reload <command name or alias>\`\``
      );
    delete require.cache[require.resolve(`./${command.name}.js`)];
    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.log(error);
      message.channel.send(
        `❌ There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
    message.channel.send(`The command \`\`${command.name}\`\` was reloaded!`);
  },
};
