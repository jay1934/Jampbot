module.exports = (client) => {
  /**
   * @returns {*} - returns psuedo-random element of array
   */
  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  /**
   * @returns {array} - returns the array
   */
  Array.prototype.cleanse = function () {
    const isDuped = [];
    this.forEach((ele, idx) =>
      isDuped.indexOf(ele) + 1 ? isDuped.push(ele) : this.splice(idx, 1)
    );
    return this;
  };

  /**
   * @returns {string} - returns the given string, with it's first character in upper-case format
   */
  String.prototype.toFirstUpperCase = function () {
    if (!/[a-z]/i.test(this[0]))
      throw new TypeError('The first character must be a letter');
    return this[0].toUpperCase() + this.substring(1);
  };

  /**
   * @param  {...object} objects - objects to compre
   * @returns {boolean} - returns true if all objects have equal keys and values
   */
  Object.isEqual = function (...objects) {
    return objects.every(
      (obj) => JSON.stringify(obj) === JSON.stringify(objects[0])
    );
  };

  /**
   * @param {number} min - max number in range (exclusive)
   * @param {number} max - min number in range (inclusive)
   * @returns {number} - returns psuedo-random number between the specified range
   */
  Math.inRange = function (min, max) {
    if (![min, max].every(Number.isInteger))
      throw new TypeError('Both numbers must be integers');
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * @param {Date} date1 - first date to compare
   * @param {Date} date2 - second date to compare
   * @param {string} DHMS - unit to measure the difference in
   * @returns {number} - returns the amount of time between dates in the specified unit
   */
  Math.getDifferenceInDHMS = function (date1, date2, DHMS) {
    const diff = Math.abs(date1 - date2);
    switch (DHMS) {
      case 'day':
        return diff / 86400000;
      case 'hour':
        return diff / 3600000;
      case 'minute':
        return diff / 60000;
      case 'second':
        return diff / 1000;
      default:
        throw new TypeError(
          'You did not specify a valid DHMS (day, hour, minute, or second).'
        );
    }
  };
  client.owner = client.users.cache.get('381490382183333899');
};
