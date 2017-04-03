'use strict';
/**
 * returns function which applies functions in given order
 * @param {Array.<Function>} fns
 * @returns {function(*=): *}
 */
module.exports = function or(...fns) {
    const [head, ...tail] = fns;
    tail.forEach(f => {
        if (f.length > 1) {
            throw Error(`Function ${f.name} expects more than 1 argument`);
        }
    });
    return (...args) => tail.reduce((x, f) => f(x), Reflect.apply(head, undefined, args));
};
