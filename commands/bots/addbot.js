const { MessageEmbed } = require('discord.js');
const botter = require('../../models/botter');

module.exports = {
  name: 'addbot',
  category: 'bots',
  setLevel: 5,
  usage: '!addbot <bot ID> <bot prefix> <bot description>',
  blacklist: true,
  description: 'Add your bot to the server',
  async execute(message, args) {
    const id = args[0];
    if (!id)
      return message.channel.send(
        `Please include your bot's user ID.\nCorrect usage: \`\`${this.usage}\`\``
      );
    if (!/^\d{17,18}$/.test(id))
      return message.channel.send(
        `That is not a valid user ID!\nCorrect usage: \`\`${this.usage}\`\``
      );
    const prefix = args[1];
    if (!prefix)
      return message.channel.send(
        `Please input your bot's prefix.\nCorrect usage: \`\`${this.usage}\`\``
      );
    const description = args.slice(2).join(' ');
    if (!description)
      return message.channel.send(
        `Please give a description of your bot, include a link to the source code if possible.\nCorrect usage: \`\`${this.usage}\`\``
      );
    if (description.length < 20)
      return message.channel.send(
        `Please make your description at least 20 characters.\nCorrect usage: \`\`${this.usage}\`\``
      );
    message.client.users
      .fetch(id, false, true)
      .then((user) => {
        if (!user.bot) return message.channel.send('That user is not a bot!');
        if (message.guild.members.cache.get(user.id))
          return message.channel.send('That user is already in the guild!');
        botter.findOne({ BotID: user.id }, (err, res) => {
          if (err) throw err;
          if (!res) return;
          if (res.Blacklisted)
            return message.channel.send('Your bot was blacklisted.');
          if (!res.Accepted)
            return message.channel.send(
              'Your bot is already in the review queue!'
            );
        });
        const confirmation = new MessageEmbed()
          .setTitle('Are you sure you want to add your bot?')
          .setColor('GREEN')
          .addField("Your Bot's Name", `**${user.username}**`)
          .addField("Your Bot's Prefix", `**${prefix}**`);
        if (description.length < 500)
          confirmation.addField(
            "Your Bot's Description",
            `${description.slice(0, 497)}...`
          );
        else confirmation.addField("Your Bot's Description", description);

        message.channel.send(confirmation).then(async (msg) => {
          await msg.react('✅');
          await msg.react('❌');
          msg
            .awaitReactions(
              (reaction, user) =>
                ['✅', '❌'].includes(reaction.emoji.name) &&
                user.id === message.author.id,
              { max: 1 }
            )
            .then(async (collected) => {
              var emoji = collected.first().emoji.name;

              if (emoji === '✅') {
                const newBot = await new botter({
                  UserID: message.author.id,
                  BotID: user.id,
                  Prefix: prefix,
                });
                newBot.save();
                message.channel.send(
                  'Your bot has been sent to the review queue!'
                );
                message.client.channels.cache
                  .get('746462163308118017')
                  .send(
                    new MessageEmbed()
                      .setColor('GREEN')
                      .setAuthor(user.tag, user.displayAvatarURL())
                      .setTitle(`New Bot; Invited by ${message.author.tag}`)
                      .setDescription(
                        `${description}\n[Jump to message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
                      )
                      .addField('Bot ID', user.id)
                      .addField('Bot Prefix', prefix)
                      .addField(
                        'Invite',
                        `[Invite this bot here](https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=70634560&scope=bot)`
                      )
                      .setFooter(
                        message.author.tag,
                        message.author.displayAvatarURL()
                      )
                  );
                msg.delete();
                message.client.channels.cache
                  .get('745787042478292993')
                  .send(
                    `${message.author.tag}'s bot, ${user.tag}, was sent into the review queue!`
                  );
              } else {
                msg.delete();
                return message.channel.send('Bot request canceled.');
              }
            });
        });
      })
      .catch((err) => {
        message.channel.send("That user doesn't exist!");
        throw err;
      });
  },
};
