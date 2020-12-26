const { MessageEmbed } = require('discord.js');
const guilds = require('../../models/guilds');

module.exports = {
  name: 'setup',
  helpIgnore: true,
  ownerOnly: true,
  async execute(message) {
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
        const collected = await msg.awaitReactions(
          (reaction, user) =>
            ['✅', '❌'].includes(reaction.emoji.name) &&
            user.id === message.author.id,
          { time: '30s', long: true }
        );
        const emoji = collected.first().emoji.name;
        if (emoji === '✅') {
          message.channel
            .send(
              new MessageEmbed()
                .setTitle('Would you like to enable moderation commands?')
                .setColor('GREEN')
            )
            .then(async (msg) => {
              const collected = await msg.awaitReactions(
                (reaction, user) =>
                  ['✅', '❌'].includes(reaction.emoji.name) &&
                  user.id === message.author.id,
                { time: '30s', long: true }
              );
              const emoji = collected.first().emoji.name;
              if (emoji === '✅') moderation = true;
              else moderation = false;
              message.channel
                .send(
                  new MessageEmbed()
                    .setTitle('Would you like to enable EXP commands?')
                    .setColor('GREEN')
                )
                .then(async (msg) => {
                  const collected = await msg.awaitReactions(
                    (reaction, user) =>
                      ['✅', '❌'].includes(reaction.emoji.name) &&
                      user.id === message.author.id,
                    { time: '30s', long: true }
                  );
                  const emoji = collected.first().emoji.name;
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
                      var results = await message.channel.awaitMessages(
                        (msg) => msg.author.id === message.author.id,
                        { time: '30000' }
                      );
                      results = results.first().content;
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
                          var results = await message.channel.awaitMessages(
                            (msg) => msg.author.id === message.author.id,
                            { time: '30000' }
                          );
                          results = results.first().content;
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
                              if (err) throw err;
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
                        .catch(() =>
                          message.channel.send(
                            "You didn't answer within 30 seconds. Setup canceled."
                          )
                        );
                    })
                    .catch(() =>
                      message.channel.send(
                        "You didn't answer within 30 seconds. Setup canceled."
                      )
                    );
                })
                .catch(() =>
                  message.channel.send(
                    "You didn't answer within 30 seconds. Setup canceled."
                  )
                );
            })
            .catch(() =>
              message.channel.send(
                "You didn't answer within 30 seconds. Setup canceled."
              )
            );
        } else return message.channel.send('Setup canceled');
      })
      .catch(() =>
        message.channel.send(
          "You didn't answer within 30 seconds. Setup canceled."
        )
      );
  },
};
