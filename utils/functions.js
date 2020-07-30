//* export functions for quick and easy use in any file
const ms = require('ms');

module.exports = {
  // make pseudorandom string using letters and numbers of specified length
  makeID(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

    /*
      Example Input: 
      console.log(makeID(5))

      Example Output: 
      DWw24
    */
  },

  // convert first letter of specified string to uppercase (if lowercase)
  toFirstUpperCase(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);

    /*
      Example Input: 
      console.log(toFirstUpperCase('hello world'))

      Example Output: 
      Hello world
    */
  },

  // check if specified user (object) has specified role (access via role name or ID)
  hasRole(user, roleNameOrID) {
    if (/\D/.test(roleNameOrID)) {
      if (user.roles.cache.some((role) => role.name === roleNameOrID)) {
        return true;
      }
    }
    if (/^\d+$/.test(roleNameOrID)) {
      if (user.roles.cache.has(roleNameOrID)) {
        return true;
      }
    }

    /*
      Example Input: 
      console.log(hasRole(message.member, 'Member'))

      Example Output: 
      false
    */
  },

  // get role (object) via role name or ID
  getRole(roleNameOrID, messageOrClient) {
    var message = messageOrClient.client || messageOrClient;
    if (/\D/.test(roleNameOrID)) {
      return message.guilds.cache
        .get(messageOrClient.guild.id || '642447344050372608')
        .roles.cache.find((role) => role.name === roleNameOrID);
    }
    if (/^\d+$/.test(roleNameOrID)) {
      return message.guilds.cache
        .get(messageOrClient.guild.id || '642447344050372608')
        .roles.cache.get(roleNameOrID);
    }

    /*
      Example Input: 
      console.log(getRole('Member', message).name)

      Example Output: 
      Member
    */
  },

  // get user (object) via user name or ID
  getUser(userNameOrID, messageOrClient) {
    var message = messageOrClient.client || messageOrClient;
    if (/\D/.test(userNameOrID)) {
      return message.users.cache.find((user) => user.username === userNameOrID);
    }
    if (/^\d+$/.test(userNameOrID)) {
      return message.users.cache.get(userNameOrID);
    }

    /*
      Example Input: 
      console.log(getUser('Lioness100', message).id + 'is the ID of a super awesome person >:3')

      Example Output: 
      381490382183333899 is the ID of a super awesome person >:3
    */
  },

  // get channel (object) via channel name or ID
  getChannel(channelNameOrID, messageOrClient) {
    var message = messageOrClient.client || messageOrClient;
    if (/\D/.test(channelNameOrID)) {
      return message.channels.cache.find(
        (channel) => channel.name === channelNameOrID
      );
    }
    if (/^\d+$/.test(channelNameOrID)) {
      return message.channels.cache.get(channelNameOrID);
    }

    /*
      Example Input: 
      console.log(getChannel('699222200787402762', message).name)

      Example Output: 
      off-topic
    */
  },

  // get emoji (object) via channel name or ID
  getEmoji(emojiNameOrID, messageOrClient) {
    var message = messageOrClient.client || messageOrClient;
    if (/\D/.test(emojiNameOrID)) {
      try {
        return message.emojis.cache.find(
          (emoji) => emoji.name === emojiNameOrID
        );
      } catch (err) {
        console.log('There may be more than one emojis by that name', err);
      }
    }
    if (/^\d+$/.test(emojiNameOrID)) {
      return message.emojis.cache.get(emojiNameOrID);
    }

    /*
      Example Input: 
      console.log(getEmoji('x', message))

      Example Output: 
      ❌
    */
  },

  // get guild (object) via channel name or ID
  getGuild(guildNameOrID, messageOrClient) {
    var message = messageOrClient.client || messageOrClient;
    if (/\D/.test(guildNameOrID)) {
      return message.guilds.cache.find((guild) => guild.name === guildNameOrID);
    }
    if (/^\d+$/.test(guildNameOrID)) {
      return message.guilds.cache.get(guildNameOrID);
    }

    /*
      Example Input: 
      console.log(getGuild('Team Jamp', message).name)

      Example Output: 
      Team Jamp
    */
  },

  async getReactions(message, author, time, validReactions) {
    // eslint-disable-next-line no-await-in-loop
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
      .awaitReactions(filter, { max: 1, time: ms(time) })
      .then((collected) => collected.first() && collected.first().emoji.name)
      .catch((err) => {
        message.channel.send(
          `You didn't answer in ${ms(ms(time), { long: true })}!`
        );
        console.log(err);
      });

    /*
      Example Input: 
      await message.channel.send('hello').then(async msg => {
            const emoji = await getReactions(msg, message.author, 30s, ["✅", "❌"]);

            if (emoji === "✅") console.log(true)
      });

       //* react '✅'

      Example Output: 
      true
    */
  },

  async getNextMessage(message, author, time) {
    return message.channel
      .awaitMessages((m) => m.author.id === author.id, {
        max: 1,
        time: ms(time),
      })
      .then((collected) => collected.first() && collected.first().content);

    /*
      Example Input: 
      await message.channel.send('hello').then(async () => {
            const results = await promptMessage(message, message.author, 30s);

            message.channel.send(results)
      });

       //* send 'hello'

      Example Output: 
      hello
    */
  },

  // move array element from one index to another
  arrMove(array, fromIndex, toIndex) {
    var element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;
  },

  // get random integer in specified min-max range (optionally using an exclusive max value)
  getRandomInt(min, max, exclusive) {
    if (!exclusive) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;

    /*
      Example Input: 
      console.log(getRandomInt(15, 20))

      Example Output: 
      17
    */
  },

  // get random element from specified array
  getRandomArrElement(array) {
    return array[Math.floor(Math.random() * array.length)];

    /*
      Example Input:
      var colors = ['blue', 'red', 'orange', 'green']
      console.log(getRandomArrElement(colors))

      Example Output: 
      red
    */
  },
};
