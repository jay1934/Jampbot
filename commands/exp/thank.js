const { fetch } = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'thank',
  aliases: ['thanks'],
  category: 'EXP',
  usage: '!thank @user',
  setLevel: 5,
  description: 'Award reputation to a user that helped you once per week',
  async execute(message, args) {
    const giver = await fetch(message.author.id, message.guild.id);
    if (
      giver.lastAward &&
      giver.lastAward > new Date().setDate(new Date().getDate() - 7)
    )
      return message.channel.send('You already awarded reputation this week!');

    const user =
      message.mentions.users.first() || message.client.users.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        'You have to mention a user to give reputation to'
      );
    if (user === message.author)
      return message.channel.send("You can't give yourself reputation smh");
    const taker = await fetch(user.id, message.guild.id);
    if (!taker)
      return message.channel.send(
        "It seems this user doesn't have any EXP yet!"
      );
    if (!taker.rep) taker.rep = 10;
    else taker.rep += 10;
    giver.lastAward = new Date();
    message.channel.send(
      new MessageEmbed()
        .setTitle('Reputation Awarded')
        .setColor('GREEN')
        .setDescription(
          `You have given **${user.username}** 10 reputation points`
        )
        .setFooter('You cannot award reputation for another week')
    );
    taker.save();
    giver.save();
  },
};
