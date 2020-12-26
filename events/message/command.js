const Discord = require('discord.js');
const Levels = require('discord-xp');
const ms = require('ms');
const guilds = require('../../models/guilds');

module.exports = async (message) => {
  const args = message.content.slice(1).split(/ +/);

  if (message.guild)
    var guild = await guilds.findOne({ GuildID: message.guild.id });

  const cooldowns = new Discord.Collection();

  const blockedChannels = require('../../data/channelBlocks.json');

  const blockedUsers = require('../../data/userBlocks.json');

  const commandName = args.shift().toLowerCase();

  if (
    !/^!/.test(message.content) ||
    blockedUsers.includes(message.author.id) ||
    message.author.bot
  )
    return;

  const command =
    message.client.commands.get(commandName) ||
    message.client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (guild) {
    if (
      !command ||
      guild.Disabled.includes(command.name) ||
      (command.exclusive && message.guild.id !== '699220238801174558')
    )
      return;
  }

  if (command.category === 'EXP' && (!guild || !guild.EXP)) return;
  if (command.category === 'moderation' && (!guild || !guild.EXP)) return;

  if (command.blacklist && blockedChannels.includes(message.channel.id)) return;

  if (
    command.rolePermission &&
    !message.member.roles.cache.some(
      (role) =>
        role.name === command.rolePermission ||
        role.id === command.rolePermisision
    )
  )
    return message.channel.send('❌ Insufficient permissions');

  if (command.ownerOnly && message.author.id !== message.client.owner.id)
    return message.channel.send('❌ Insufficient permissions');

  if (command.guildOnly && message.channel.type !== 'text')
    return message.reply("❌ I can't execute that command inside DMs!");
  if (
    command.modOnly &&
    !message.member.hasPermission('MANAGE_GUILD') &&
    !command.rolePermission
  )
    return message.channel.send('❌ Insufficient permissions');

  if (command.disabled) return;

  if (command.cooldown) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    if (command.setLevel) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      if (!user || user.level < command.setLevel)
        return message.channel.send(
          `You need to be at least **level ${command.setLevel}** to use that command <:SadPog:710543485849174067>`
        );
    }

    const now = Date.now();

    const timestamps = cooldowns.get(command.name);

    const cooldownAmount = ms(command.cooldown) || 3000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          `❌ Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`\`${command.name}\`\` command.`
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    if (guild)
      command.execute(
        message,
        args,
        message.client.channels.cache.get(guild.Log)
      );
    else command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send(
      '❌ There was an error trying to execute that command!'
    );
  }
};
