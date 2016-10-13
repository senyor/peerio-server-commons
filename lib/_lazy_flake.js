const _ = require('lodash');
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';



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

let lastMillisecond = Date.now();
let millisCount = 0;

/**
 * Lazy UUID generator.
 * Generate 14 characters strings like 'idze6rl61e7rap'
 * First 8 characters are timestamp, next 4 sybols are process id,
 * last two sybols represents random number 1-1000.
 * @returns {string}
 */
const newId = function () {
    const now = Date.now();

    if(lastMillisecond === now){
        millisCount += 1;
    } else {
        millisCount = 0;
        lastMillisecond = now;
    }
    return [
        Date.now().toString(36),
        cutToLength(process.pid.toString(36), 4),
        chars.charAt(_.random(chars.length)),
        chars.charAt(_.random(chars.length)),
        millisCount.toString(36)
    ].join('');
};

module.exports = {
    newId
};
