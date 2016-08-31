'use strict';
const Q = require('q');
const _ = require('lodash');

module.exports = function (obj, methodName) {
    if (_.isFunction(obj[methodName]) && !obj[`${methodName}Asynq`]) {
        obj[`${methodName}Asynq`] = Q.denodeify(obj[methodName].bind(obj));
    }
    return obj;
};
