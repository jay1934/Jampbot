const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
module.exports = {
  name: "mute",
  guildOnly: true,
  modOnly: true,
  aliases: ["unmute", "tempmute"],
  async execute(message, args) {
    const usage = "\nCorrect usage: ``!mute @user [reason]``";
    const unusage = "\nCorrect usage: ``!unmute @user [reason]``";
    const tempusage =
      "\nCorrect usage: ``!tempmute @user duration[s/m/h] [reason]";
    if (message.content.includes("!mute")) {
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      let mainRole = message.guild.roles.cache.find(
        val => val.name === "Member"
      );
      let muteRole = message.guild.roles.cache.find(
        val => val.name === "Muted"
      );
      let reason = args.slice(1).join(" ");
      if (!muteRole)
        return message.channel.send(
          "❌ There is no 'Muted' role on this server"
        );
      if (!message.mentions.users.first())
        return message.channel.send(
          `❌ Please mention someone to mute them.${usage}`
        );
      if (message.guild.member(user).roles.cache.has(muteRole.id)) {
        return message.channel.send("❌ That user is already been muted");
      }
      if (message.mentions.users.first().id === message.author.id)
        return message.channel.send(
          "❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>"
        );
      if (user.id === message.client.user.id)
        return message.channel.send(
          "❌ You can't mute me **I made you** <:mi_emote_o:717925349299585035>"
        );
      if (message.mentions.users.first().id === config.ownerid)
        return message.channel.send("❌ You can't mute my Developer :wink:");
      let botRolePossition = message.guild.member(message.client.user).roles
        .highest.position;
      let rolePosition = message.guild.member(user).roles.highest.position;
      let userRolePossition = message.member.roles.highest.position;
      if (userRolePossition <= rolePosition)
        return message.channel.send(
          "❌**Error:** Cannor mute that member because they have roles that is higher or equal to you."
        );
      if (botRolePossition <= rolePosition)
        return message.channel.send(
          "❌**Error:** Cannor mute that member because they have roles that is higher or equal to me."
        );

      if (!reason) reason = "No reason supplied.";

      message.guild.member(user).roles.remove(mainRole);
      message.guild.member(user).roles.add(muteRole);

      const muteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(config.thumbnails.sad)
        .setDescription(`✅ **${user.tag}** has been successfully muted!`)
        .setFooter(
          `Please resort to #anti-softlock with questions or complaints on this mute`
        )
        .addField(
          "Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField("Reason", reason);
      message.channel.send({
        embed: muteConfirmationEmbed
      });
      message.client.channels.cache
        .get(config.channelID.modlog)
        .send({ embed: muteConfirmationEmbed });

      const muteDM = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(config.thumbnails.sad)
        .setFooter(
          `Please resort to #anti-softlock with questions or complaints on this mute`
        )
        .setDescription(
          `You have been muted in Team Jamp indefinitely :confused:`
        )
        .addField(
          "Original Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField("Original Reason", reason);

      user.send({ embed: muteDM });
    } else if (message.content.includes("!unmute")) {
      const usage = "\nCorrect usage: ``!unmute @user [reason]``";
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      let mainRole = message.guild.roles.cache.find(
        val => val.name === "Member"
      );
      let muteRole = message.guild.roles.cache.find(
        val => val.name === "Muted"
      );
      if (!message.mentions.users.first())
        return message.channel.send(
          `❌ Please mention someone to mute them.${unusage}`
        );
      if (!message.guild.member(user).roles.cache.has(muteRole.id)) {
        return message.channel.send(`❌ That user is not muted`);
      }

      let reason = args.slice(1).join(" ");
      if (!muteRole)
        return message.channel.send(
          "❌ There is no 'Muted' role on this server"
        );
      if (message.mentions.users.first().id === message.author.id)
        return message.channel.send(
          "❌ You can't unmute yourself smh <:WeirdChamp:699435969824161823>"
        );
      let botRolePossition = message.guild.member(message.client.user).roles
        .highest.position;
      let rolePosition = message.guild.member(user).roles.highest.position;
      let userRolePossition = message.member.roles.highest.position;
      if (userRolePossition <= rolePosition)
        return message.channel.send(
          "❌**Error:** Cannor unmute that member because they have roles that is higher or equal to you."
        );
      if (botRolePossition <= rolePosition)
        return message.channel.send(
          "❌**Error:** Cannor unmute that member because they have roles that is higher or equal to me."
        );

      if (!reason) reason = "No reason supplied.";

      message.guild.member(user).roles.remove(muteRole);
      message.guild.member(user).roles.add(mainRole);

      if (config.channelID.modlog.length !== 0) {
        const unmuteConfirmationEmbed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`✅ **${user.tag}** has been successfully unmuted!`)
          .addField(
            "Moderator:",
            `${message.author.username}#${message.author.discriminator}`
          )

          .addField("Reason", reason);
        message.channel.send({
          embed: unmuteConfirmationEmbed
        });
        message.client.channels.cache
          .get(config.channelID.modlog)
          .send({ embed: unmuteConfirmationEmbed });
      }

      const unmuteDM = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `You have been unmuted from Team Jamp. Please discontinue the behavior that led to your mute :confused:`
        )
        .addField(
          "Original Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )

        .addField("Original Reason", reason);

      user.send({ embed: unmuteDM });
    } else if (message.content.includes("!tempmute")) {
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      let mainRole = message.client.guilds.cache
        .get(message.guild.id)
        .roles.cache.find(val => val.name === "Member");
      let muteRole = message.client.guilds.cache
        .get(message.guild.id)
        .roles.cache.find(val => val.name === "Muted");
      let time = args[1];
      let reason = args.slice(2).join(" ");
      if (!muteRole)
        return message.channel.send(
          `❌ There is no 'Muted' role on this server`
        );
      if (!message.mentions.users.first())
        return message.channel.send(
          `❌ Please mention someone to mute them.${tempusage}`
        );
      if (message.guild.member(user).roles.cache.has(muteRole.id)) {
        return message.channel.send("❌ That user is already been muted");
      }
      if (message.mentions.users.first().id === message.author.id)
        return message.channel.send(
          "❌ Self-harm is bad smh <:WeirdChamp:699435969824161823>"
        );
      if (user.id === message.client.user.id)
        return message.channel.send(
          "❌ You can't ban me **I made you** <:mi_emote_o:717925349299585035>"
        );
      if (message.mentions.users.first().id === config.ownerid)
        return message.channel.send("❌ You can't mute my Developer :wink:");
      let botRolePossition = message.guild.member(message.client.user).roles
        .highest.position;
      let rolePosition = message.guild.member(user).roles.highest.position;
      let userRolePossition = message.member.roles.highest.position;
      if (userRolePossition <= rolePosition)
        return message.channel.send(
          "❌**Error:** Cannor mute that member because they have roles that is higher or equal to you."
        );
      if (botRolePossition <= rolePosition)
        return message.channel.send(
          "❌**Error:** Cannor mute that member because they have roles that is higher or equal to me."
        );

      if (!time || time <= 0)
        return message.channel.send(
          `❌ Please specify a value followed by ``s, m, or h`` to signify the time period this user will be muted.${tempusage}`
        );
      if (!reason) reason = "No reason supplied.";

      message.guild.member(user).roles.remove(mainRole);
      message.guild.member(user).roles.add(muteRole);

      if (config.channelID.modlog.length !== 0) {
        const muteConfirmationEmbed = new Discord.MessageEmbed()
          .setColor("RED")
          .setThumbnail(config.thumbnails.sad)
          .setFooter(
            `Please resort to #anti-softlock with questions or complaints on this mute`
          )
          .setDescription(
            `✅ **${user.tag}** has been temp muted for ${ms(ms(time), {
              long: true
            })}!`
          )
          .addField(
            "Moderator:",
            `${message.author.username}#${message.author.discriminator}`
          )
          .addField("Mute Duration", time)

          .addField("Reason", reason);
        message.channel.send({
          embed: muteConfirmationEmbed
        });
        message.client.channels.cache
          .get(config.channelID.modlog)
          .send({ embed: muteConfirmationEmbed });
      }

      const muteDM = new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(config.thumbnails.sad)
        .setFooter(
          `Please resort to #anti-softlock with questions or complaints on this mute`
        )
        .setDescription(
          `You have been temporarily muted in Team Jamp :confused:`
        )
        .addField(
          "Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField("Mute Duration", time)

        .addField("Reason", reason);

      user.send({ embed: muteDM });

      const unmuteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`✅ **${user.tag}** has been successfully unmuted!`)
        .addField(
          "Original Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField("Original Mute Duration", time)

        .addField("Original Reason", reason);

      const unmuteDM = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `You have been unmuted from Team Jamp. Please discontinue the behavior that led to your mute :confused:`
        )
        .addField(
          "Original Moderator:",
          `${message.author.username}#${message.author.discriminator}`
        )
        .addField("Original Mute Duration", time)

        .addField("Original Reason", reason);

      setTimeout(function() {
        message.guild.member(user).roles.add(mainRole);
        message.guild.member(user).roles.remove(muteRole);

        user.send({ embed: unmuteDM });
        message.client.channels.cache
          .get(config.channelID.modlog)
          .send({ embed: unmuteConfirmationEmbed });
      }, ms(time));
    } else {
      message.channel.send("There was a problem. Please try again later.");
    }
  }
};