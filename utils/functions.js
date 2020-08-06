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

    /**
     * @param {string} [length] - length of substring
     * @returns {string}
     *
     * @example
     * makeID(5) => DWw24
     */
  },

  // convert first letter of specified string to uppercase (if lowercase)
  toFirstUpperCase(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);

    /**
     * @param {string} [string] - string to edit
     * @returns {string}
     *
     * @example
     * toFirstUpperCase('hello world') => Hello world
     */
  },

  // check if specified user (object) has specified role (access via role name or ID)
  hasRole(user, roleNameOrID) {
    return (
      user.roles.cache.some((role) => role.name === roleNameOrID) ||
      user.roles.cache.has(roleNameOrID)
    );

    /**
     * @param {object} [user] - user to check
     * @param {string} [roleNameOrID] - either the name or ID of the role
     * @returns {boolean}
     *
     * @example
     * hasRole(message.member, 'Member') => false
     */
  },

  // get role (object) via role name or ID
  getRole(roleNameOrID, client) {
    return (
      client.guilds.cache
        .get(client.guild.id || '642447344050372608')
        .roles.cache.find((role) => role.name === roleNameOrID) ||
      client.guilds.cache
        .get(client.guild.id || '642447344050372608')
        .roles.cache.get(roleNameOrID)
    );

    /**
     * @param {string} [rolNameOrID] - either the name or ID of the role
     * @param {object} [client] - discord.js client
     * @returns {object}
     *
     * @example
     * getRole('Member', message.client).name => Member
     */
  },

  // get user (object) via user name or ID
  getUser(userNameOrID, client) {
    return (
      client.users.cache.find((user) => user.username === userNameOrID) ||
      client.users.cache.get(userNameOrID)
    );

    /**
     * @param {string} [userNameOrID] - either name or ID of user
     * @param {object} [client] - discord.js client
     * @returns {object}
     *
     * @example
     * getUser('Lioness100', message.client).id => 381490382183333899
     */
  },

  // get channel (object) via channel name or ID
  getChannel(channelNameOrID, client) {
    return (
      client.channels.cache.find(
        (channel) => channel.name === channelNameOrID
      ) || client.channels.cache.get(channelNameOrID)
    );

    /**
     * @param {string} [channelNameOrID] - either name or ID of channel
     * @param {object} [client] - discord.js client
     * @returns {object}
     *
     * @example
     * getChannel('699222200787402762', message.client).name => off-topic
     */
  },

  // get emoji (object) via channel name or ID
  getEmoji(emojiNameOrID, client) {
    try {
      return (
        client.emojis.cache.find((emoji) => emoji.name === emojiNameOrID) ||
        client.emojis.cache.get(emojiNameOrID)
      );
    } catch (err) {
      console.log('There may be more than one emojis by that name', err);
    }

    /**
     * @param {string} [emojiNameOrID] - either name or ID of emoji
     * @param {object} [client] - discord.js client
     * @returns {object}
     *
     * @example
     * getEmoji('x', message) => ❌
     */
  },

  // get guild (object) via channel name or ID
  getGuild(guildNameOrID, client) {
    return (
      client.guilds.cache.find((guild) => guild.name === guildNameOrID) ||
      client.guilds.cache.get(guildNameOrID)
    );

    /**
     * @param {string} [guildNameOrID] - either name or ID of guild
     * @param {object} [client] - discord.js client
     * @returns {object}
     *
     * @example
     * getGuild('Team Jamp', message).name => Team Jamp
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

    /**
     * @param {object} [message] - message to react on
     * @param {object} [author] - user to accept reactions from (usually message.author)
     * @param {string} [time] - time given to react
     * @param {string[]} [validReactions] - emojis to accept
     * @returns {object}
     *
     * @example
     * await message.channel.send('hello').then(async msg => {
     *       const emoji = await getReactions(msg, message.author, 30s, ["✅", "❌"]);
     */
  },

  async getNextMessage(channel, author, time) {
    return channel
      .awaitMessages((m) => m.author.id === author.id, {
        max: 1,
        time: ms(time),
      })
      .then(
        (collected) =>
          collected.first() && collected.first().content.toLowerCase()
      );

    /**
     * @param {object} [channel] - channel to get message from
     * @param {object} [author] - user to accept message from
     * @param {string} [time] - time given to send a message
     * @returns {object}
     *
     * @example
     * await message.channel.send('hello').then(async () => {
     *       const results = await promptMessage(message, message.author, 30s);
     */
  },

  // move array element from one index to another
  arrMove(array, fromIndex, toIndex) {
    var element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;

    /**
     * @param {array} [array] - array to use
     * @param {number} [fromIndex] - original index of element
     * @param {number} [toIndex] - new index of element
     * @returns {array}
     *
     * @example
     * arrMove(['first', 'second', 'third'], 1, 2) => ['first', 'third', 'second']
     */
  },

  // get random integer in specified min-max range (optionally using an exclusive max value)
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

    /**
     * @param {number} [min] - minimum number in range
     * @param {number} [max] - maximum number in range (inclusive)
     * @returns {number}
     *
     * @example
     * console.log(getRandomInt(15, 20)) => 17
     */
  },

  // get random element from specified array
  getRandomArrElement(array) {
    return array[Math.floor(Math.random() * array.length)];

    /**
     * @param {array} [array] - array to get element from
     * @returns {*}
     *
     * @example
     * getRandomArrElement(['blue', 'red', 'orange', 'green'])) => red
     */
  },
};
