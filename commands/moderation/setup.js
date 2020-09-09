const { MessageEmbed } = require('discord.js');
const { getNextMessage, getReactions } = require('../../utils/functions');
const guilds = require('../../models/guilds');

module.exports = {
  name: 'setup',
  helpIgnore: true,
  ownerOnly: true,
  async execute(message, args) {
    var moderation, exp, log, welcome;
    message.channel
      .send(
        new MessageEmbed()
          .setTitle('Thank you for inviting me to your server!')
          .setDescription(
            "Please react to this message when you are ready, then answer the following questions so I know how you'd like to use me in this discord <a:PogJamper:704670075667611648>. You can redo this setup any time."
          )
          .setColor('GREEN')
      )
      .then(async (msg) => {
        const emoji = await getReactions(msg, message.author, '30s', [
          '✅',
          '❌',
        ]);
        console.log(emoji);
        if (emoji === '✅') {
          message.channel
            .send(
              new MessageEmbed()
                .setTitle('Would you like to enable moderation commands?')
                .setColor('GREEN')
            )
            .then(async (msg) => {
              const emoji = await getReactions(msg, message.author, '30s', [
                '✅',
                '❌',
              ]);
              if (emoji === '✅') moderation = true;
              else moderation = false;
              message.channel
                .send(
                  new MessageEmbed()
                    .setTitle('Would you like to enable EXP commands?')
                    .setColor('GREEN')
                )
                .then(async (msg) => {
                  const emoji = await getReactions(msg, message.author, '30s', [
                    '✅',
                    '❌',
                  ]);
                  if (emoji === '✅') exp = true;
                  else exp = false;
                  message.channel
                    .send(
                      new MessageEmbed()
                        .setTitle('Do you have a mod log channel?')
                        .setDescription(
                          'If you do, please respond with the channel ID. Otherwise, respond ``no``'
                        )
                        .setColor('GREEN')
                    )
                    .then(async () => {
                      const results = await getNextMessage(
                        message.channel,
                        message.author,
                        '30s'
                      );
                      if (results === 'no') log = null;
                      else if (results) {
                        const channel = message.guild.channels.cache.get(
                          results
                        );
                        if (channel) log = channel;
                        else
                          return message.channel.send(
                            'That is not a valid channel id. Setup canceled.'
                          );
                      }
                      message.channel
                        .send(
                          new MessageEmbed()
                            .setTitle('Do you have a welcome channel?')
                            .setDescription(
                              'If you do, please respond with the channel ID. Otherwise, respond ``no``'
                            )
                            .setColor('GREEN')
                        )
                        .then(async () => {
                          const results = await getNextMessage(
                            message.channel,
                            message.author,
                            '30s'
                          );
                          if (results === 'no') welcome = null;
                          else if (results) {
                            const channel = message.guild.channels.cache.get(
                              results
                            );
                            if (channel) welcome = channel;
                            else
                              return message.channel.send(
                                'That is not a valid channel id. Setup canceled.'
                              );
                          }
                          message.channel.send(
                            new MessageEmbed()
                              .setAuthor(message.guild.name)
                              .setTitle('Your preferences were recorded!')
                              .setDescription(
                                'You can ``!disable`` any command at any time 👍'
                              )
                              .setColor('GREEN')
                          );

                          guilds.findOne(
                            { GuildID: message.guild.id },
                            (err, data) => {
                              if (err) console.log(err);
                              if (!data) {
                                const newGuild = new guilds({
                                  GuildID: message.guild.id,
                                  Moderation: moderation,
                                  EXP: exp,
                                  Log: log,
                                  Welcome: welcome,
                                });
                                newGuild.save();
                              } else {
                                data.EXP = exp;
                                data.Moderation = moderation;
                                data.LogID = log;
                                data.Welcome = welcome;
                              }
                            }
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                          return message.channel.send(
                            "You didn't answer within 30 seconds. Setup canceled."
                          );
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                      return message.channel.send(
                        "You didn't answer within 30 seconds. Setup canceled."
                      );
                    });
                })
                .catch((err) => {
                  console.log(err);
                  return message.channel.send(
                    "You didn't answer within 30 seconds. Setup canceled."
                  );
                });
            })
            .catch((err) => {
              console.log(err);
              return message.channel.send(
                "You didn't answer within 30 seconds. Setup canceled."
              );
            });
        } else return message.channel.send('Setup canceled');
      })
      .catch((err) => {
        console.log(err);
        return message.channel.send(
          "You didn't answer within 30 seconds. Setup canceled."
        );
      });
  },
};
