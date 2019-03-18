'use strict';

const _ = require('lodash');
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';


/**
 * Produces fixed length string of length n out of given string str.
 * @param {string} str - string to cut
 * @param {number} n - desired length
 * @returns {string} - string of fixed length n
 */
function cutToLength(str, n) {
    if (str.length > n) {
        return str.substring(0, n);
    }
    return (_.padStart(str, n, '0'));
}

let lastMillisecond = Date.now(),
    millisCount = 0;

module.exports = {
    newId() {
        const now = Date.now();

        if (lastMillisecond === now) {
            millisCount += 1;
        } else {
            millisCount = 0;
            lastMillisecond = now;
        }
        return [
            Date.now().toString(36),
            cutToLength(process.pid.toString(36), 4),
            cutToLength(millisCount.toString(36), 2),
            chars.charAt(_.random(chars.length - 1)),
            chars.charAt(_.random(chars.length - 1))
        ].join('');
    }
};
