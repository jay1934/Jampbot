//* export functions for quick and easy use in any file
const ms = require('ms');

module.exports = {
  /**
   * @description make pseudorandom string using letters and numbers of specified length
   * @param {number} [length] - length of string to generate
   * @returns {string} id string
   * @example (8) => Id72Ai7a
   */
  makeID(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  /**
   * @description convert first letter of specified string to uppercase (if lowercase)
   * @param {string} [string] - string to edit
   * @returns {string} edited string
   * @example hello world => Hello world
   */
  toFirstUpperCase(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  },

  /**
   * @description check if specified user (object) has specified role (access via role name or ID)
   * @param {object} [user] - user to check
   * @param {string} [role] - name or id of role to check
   * @returns {boolean} returns true if user has role, false otherwise
   * @example (message.member, 'PogJamper') => true
   */
  hasRole(user, role) {
    return (
      user.roles.cache.some((role) => role.name === role) ||
      user.roles.cache.has(role)
    );
  },

  /**
   * @description get role (object) via role name or ID
   * @param {string} [role] - name or id of role to get
   * @param {object} [client] - Discord client
   * @returns {object} role object
   * @example ('Member', message.client).name => Member
   */
  getRole(role, guild) {
    return (
      guild.roles.cache.find((r) => r.name === role) ||
      guild.roles.cache.get(role)
    );
  },

  /**
   * @description get user (object) via user name or ID
   * @param {string} [user] - name or id of user to get
   * @param {object} [client] - Discord client
   * @returns {object} user object
   * @example ('Lioness100', message.client).discriminator => 4566
   */
  getUser(user, client) {
    return (
      client.users.cache.find((u) => u.username === user) ||
      client.users.cache.get(user)
    );
  },

  /**
   * @description get channel (object) via channel name or ID
   * @param {string} [channel] - name or id of channel to get
   * @param {object} [client] - Discord Client
   * @returns {object} channel object
   * @example ('off-topic', message.client).deleted => false
   */
  getChannel(channel, client) {
    const ch =
      client.channels.cache.find((c) => c.name === channel) ||
      client.channels.cache.get(channel);
    if (!ch) return false;
    return ch;
  },

  /**
   * @description get emoji (object) via channel name or ID
   * @param {string} [emoji] - name or id of emoji to get
   * @param {object} [client] - Discord client
   * @returns {object} emoji object (will be parsed if sent in message)
   * @example ('x', message.client) => ❌
   */
  getEmoji(emoji, client) {
    try {
      return (
        client.emojis.cache.find((e) => e.name === emoji) ||
        client.emojis.cache.get(emoji)
      );
    } catch (err) {
      console.log('There may be more than one emojis by that name', err);
    }
  },

  /**
   * @description get guild (object) via channel name or ID
   * @param {string} [guild] - name or id of guild to get
   * @param {object} [client] - Discord client
   * @returns {object} guild object
   * @example ('Team Jamp', message.client).name => Team Jamp
   */
  getGuild(guild, client) {
    return (
      client.guilds.cache.find((g) => g.name === guild) ||
      client.guilds.cache.get(guild)
    );
  },

  /**
   * @description collect reactions from a message
   * @param {object} [message] - message to react to
   * @param {object} [author] - user to accept reactions from
   * @param {string} [time] - time given to react
   * @param {string[]} [validReactions] - array of reactions to accept
   * @returns {string} name of first emoji reacted (lower case)
   * @example await message.channel.send('hello').then(async msg => {
   *       const emoji = await getReactions(msg, message.author, '30s', ["✅", "❌"]);
   */
  async getReactions(message, author, time, validReactions) {
    // eslint-disable-next-line no-await-in-loop
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
      .awaitReactions(filter, { max: 1 })
      .then((collected) => collected.first().emoji.name)
      .catch((err) => {
        message.channel.send(
          `You didn't answer in ${ms(ms(time), { long: true })}!`
        );
        console.log(err);
      });
  },

  /**
   * @description collect next message sent in channel
   * @param {object} [channel] - channel to collect messages from
   * @param {object} [author] - user to accept messages from
   * @param {string} [time] - time given to send a message
   * @param {boolean} [full] - whether to return full object, or just content
   * @returns {string} - message content (lower case)
   * @example await message.channel.send('hello').then(async () => {
   *       const results = await getNexttMessage(message.channel, message.author, 30s);
   */
  async getNextMessage(channel, author, time, full) {
    return full
      ? channel
          .awaitMessages((m) => m.author.id === author.id, {
            max: 1,
            time: ms(time),
          })
          .then((collected) => collected.first())
      : channel
          .awaitMessages((m) => m.author.id === author.id, {
            max: 1,
            time: ms(time),
          })
          .then((collected) => collected.first().content.toLowerCase());
  },

  /**
   * @description move array element from one index to another
   * @param {array} [array] - array to edit
   * @param {number} [fromIndex] - original index of element
   * @param {number} [toIndex] - new index for element
   * @returns {array} edited array
   * @example (['first', 'second', 'third'], 1, 2) => ['first', 'third', 'second']
   */
  arrMove(array, fromIndex, toIndex) {
    var element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;
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

  getDifferenceInDHMS(date1, date2, DHMS) {
    if (DHMS === 'day') {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60 * 24);
    }
    if (DHMS === 'hour') {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60);
    }
    if (DHMS === 'minute') {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60);
    }
    if (DHMS === 'second') {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / 1000;
    }
    throw new TypeError(
      'You did not specify a valid DHMS (day, hour, minute, or second).'
    );
  },

  schedule(time, triggerThis) {
    // get hour and minute from hour:minute param received, ex.: '16:00'
    const hour = Number(time.split(':')[0]);
    const minute = Number(time.split(':')[1]);

    // create a Date object at the desired timepoint
    const startTime = new Date();
    startTime.setHours(hour, minute);
    const now = new Date();

    // increase timepoint by 24 hours if in the past
    if (startTime.getTime() < now.getTime()) {
      startTime.setHours(startTime.getHours() + 24);
    }

    // get the interval in ms from now to the timepoint when to trigger the alarm
    const firstTriggerAfterMs = startTime.getTime() - now.getTime();

    // trigger the function triggerThis() at the timepoint
    // create setInterval when the timepoint is reached to trigger it every day at this timepoint
    setTimeout(function () {
      triggerThis();
      setInterval(triggerThis, 24 * 60 * 60 * 1000);
    }, firstTriggerAfterMs);
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
