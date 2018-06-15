'use strict';

const Q = require('q');
const Promise = require('bluebird');

module.exports = function bluebird2q(promise) {
    if (promise instanceof Promise) {
        return Q.Promise((resolve, reject) => promise
            .then(rslt => {
                resolve(bluebird2q(rslt));
            })
            .catch(err => {
                reject(bluebird2q(err));
            })
        );
    }
    return promise;
};
