'use strict';

/**
 * returns function of single variable which returns OR combination of all supplied functions
 * @param {Array.<Function>} fns
 * @returns {function(*=): *}
 */
module.exports = function or(...fns) {
    return x => fns.reduce((result, f) => result || Boolean(f(x)), false);
};
