const Discord = require('discord.js');
const reports = require('../../models/reports');

const reportEmbed = new Discord.MessageEmbed()
  .setTitle('New Report')
  .setColor('RED')
  .setDescription(
    'Thank you for advancing your report.\n\nPlease reply with a message indicating what your report is about, and any other details you would like us to know.'
  );
const ticketEmbed = new Discord.MessageEmbed()
  .setTitle('New Report')
  .setColor('RED')
  .setDescription(
    "Thank you for helping us make Team Jamp a better place.\n\nPlease react with 📫 if you would like to create a dedicated a channel in Team Jamp where you can talk directly to our moderators about your report.\n\nOtherwise, please react with 📧 if you'd just like to send a quick, optionally anonymous, message to us through this DM channel.\n"
  );

module.exports = {
  name: 'report',
  category: 'info',
  usage: '!report',
  description: 'Report something/someone',
  async execute(message) {
    if (message.channel.type !== 'dm') {
      message.delete();
      message.channel
        .send('❌ This command can only be triggered in DMs.')
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      return;
    }
    const val = `user-report-${Math.inRange(1000, 9999)}`;
    let msg1 = await message.channel.send(ticketEmbed);
    msg1.react('📫').then(() => msg1.react('📧'));

    const filter = (reaction, user) => {
      return (
        ['📫', '📧'].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    msg1
      .awaitReactions(filter, { max: 1, time: 120000 })
      .then(async (collected) => {
        const reaction = collected.first();
        if (reaction.emoji.name === '📫') {
          const overviewNeeded = new Discord.MessageEmbed()
            .setTitle('New Report')
            .setColor('RED')
            .setDescription(
              "Please give a short overview of what your report is about. Keep it short and sweet, around one sentence. You'll be able to elaborate when your channel is opened."
            );
          msg1.delete();
          msg1 = await message.channel.send(overviewNeeded);
          message.channel
            .awaitMessages((m) => m.author.id === message.author.id, {
              max: 1,
              time: 60000,
            })

            .then(async (collected) => {
              // only accept messages by the user who sent the command
              // accept only 1 message, and return the promise after 30000ms = 30s
              const quickReportMessage = collected.first();
              const newTicket = new Discord.MessageEmbed()
                .setTitle(`New Report Created by ${message.author.username}`)
                .setColor('RED')
                .setDescription(
                  `Please use this channel to discuss with ${message.author.username} about their report.`
                )
                .addField('Report Overview', quickReportMessage);
              const jamp = message.client.guilds.cache.get(
                '699220238801174558'
              );
              await jamp.channels
                .create(`${val}`, {
                  type: 'text',
                  permissionOverwrites: [
                    {
                      id: jamp.id,
                      deny: ['VIEW_CHANNEL'],
                    },
                    {
                      id: message.author.id,
                      allow: ['VIEW_CHANNEL'],
                    },
                    {
                      type: 'role',
                      id: '699669246476812288',
                      allow: ['VIEW_CHANNEL'],
                    },
                  ],
                })

                .then((channel) => {
                  channel.setParent('727561183921569832');
                  channel.setTopic(message.author.username`'s Report`);
                  channel.send(newTicket);

                  const ticketContinuation = new Discord.MessageEmbed()
                    .setTitle('New Report')
                    .setColor('RED')
                    .setDescription(
                      `Thank you for advancing your report; a new channel has been made. Please visit it [here](http://discord.com/channels/699220238801174558/${channel.id}) to continue.`
                    );

                  msg1.edit(ticketContinuation);
                });
              const newReport = new reports({
                CreatorID: message.author.id,
                Report: quickReportMessage,
              });
              newReport.save();
            })

            .catch(() => {
              message.reply('❌ No answer after 1 minute; report canceled.');
            });
        } else {
          msg1.delete();
          msg1 = await message.channel.send(reportEmbed);
          message.channel
            .awaitMessages((m) => m.author.id === message.author.id, {
              max: 1,
              time: 600000,
            })
            .then(async (collected) => {
              // only accept messages by the user who sent the command
              // accept only 1 message, and return the promise after 30000ms = 30s
              const reportMessage = collected.first();
              var key = '';
              var characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              var charactersLength = characters.length;
              for (var i = 0; i < 4; i++) {
                key += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                );
              }
              const report = new Discord.MessageEmbed()
                .setAuthor(`Message Key: ${key}`)
                .setDescription(reportMessage);
              const yes = '✅';
              const no = '❌';
              const anonymous = new Discord.MessageEmbed()
                .setTitle('New Report')
                .setColor('RED')
                .setDescription(
                  `Please react to this message with ${yes} if you would like this message to be sent anonymously (you'll still get an update when the report is closed). Otherwise, react with ${no} if you want your name to show.`
                );
              msg1.edit(anonymous);
              msg1.react(yes).then(() => msg1.react(no));

              const filter = (reaction, user) => {
                return (
                  [yes, no].includes(reaction.emoji.name) &&
                  user.id === message.author.id
                );
              };

              msg1
                .awaitReactions(filter, { max: 1, time: 120000 })
                .then(async (collected) => {
                  const reaction = collected.first();
                  if (reaction.emoji.name === yes) {
                    report.setTitle('New Anonymous Report:');
                    msg1.delete();
                    const yesEmbed = new Discord.MessageEmbed()
                      .setTitle('Thanks for the Report!')
                      .setColor('GREEN')
                      .setDescription(
                        'Your anonymous report has been sent to the moderators of Team Jamp! You will be notified when your report is closed'
                      )
                      .setFooter('We really appreciate your help <3');
                    message.channel.send(yesEmbed);
                    message.guild.channels.cache
                      .find((channel) => channel.name === 'reports')
                      .send(report);
                  } else {
                    report.setTitle(
                      `New Report Sent by ${message.author.username}:`
                    );
                    msg1.delete();
                    const yesEmbed = new Discord.MessageEmbed()
                      .setTitle('Thanks for the Report!')
                      .setColor('GREEN')
                      .setDescription(
                        'Your report has been sent to the moderators of Team Jamp! You will be notified when your report is closed'
                      )
                      .setFooter('We really appreciate your help <3');
                    message.channel.send(yesEmbed);
                    message.guild.channels.cache
                      .find((channel) => channel.name === 'reports')
                      .send(report)
                      .then((msg) => msg.pin);
                  }
                  const newReport = new reports({
                    ReportID: key,
                    CreatorID: message.author.id,
                    Report: reportMessage,
                  });
                  newReport.save();
                })
                .catch(() =>
                  message.channel.send(
                    '❌ No answer after 2 minutes; report canceled.'
                  )
                );
            })
            .catch(() =>
              message.reply('❌ No answer after 10 minutes; report canceled.')
            );
        }
      })
      .catch(() =>
        message.channel.send('❌ No answer after 2 minutes; report canceled.')
      );
  },
};
