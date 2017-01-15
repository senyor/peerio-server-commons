'use strict';
/**
 * returns function of single variable which returns negation of the result supplied function
 * @param {Array.<Function>} fns
 * @returns {function(*=): *}
 */
module.exports = function or(fn) {
    return x => !fn(x);
};
