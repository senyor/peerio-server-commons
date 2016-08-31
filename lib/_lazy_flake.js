const _ = require('lodash');

/**
 * Produces fixed length string of length n out of given string str.
 * @param {string} str
 * @param {number} n
 * @returns {string}
 */
function cutToLength(str, n) {
    if (str.length > n) {
        return str.substring(0, n);
    }
    return (_.padStart(str, n, '0'));
}

/**
 * Lazy UUID generator.
 * Generate 14 characters strings like 'idze6rl61e7rap'
 * First 8 characters are timestamp, next 4 sybols are process id,
 * last two sybols represents random number 1-1000.
 * @returns {string}
 */
const newId = function () {
    return [
        Date.now().toString(36),
        cutToLength(process.pid.toString(36), 4),
        cutToLength(_.random(1000).toString(36), 2)
    ].join('');
};

module.exports = {
    newId
};
