const Discord = require('discord.js');

module.exports = {
  name: 'warnings',
  modOnly: true,
  category: 'moderation',
  usage: '!warnings @user',
  description: "Displays user's warning's in Team Jamp",
  async execute(message, args) {
    const warns = require('../../models/warns');
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`No user specified!`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) throw err;
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        const Embed = new Discord.MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}`)
          .setColor('RED')
          .setThumbnail(
            'https://cdn.discordapp.com/attachments/699230720392167482/715882589986226276/1590749817205_1_600x600.png'
          )
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `**Warn ${i + 1}.**\n\t**Moderator:** ${
                    message.client.users.cache.get(w.Moderator).username
                  }\n\t**Reason:** ${w.Reason}`
              ).join('\n\n');
            })
          );
        message.channel.send(Embed);
      }
    );
  },
};
