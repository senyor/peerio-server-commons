'use strict';
const andFn = require('./and');
const orFn = require('./or');
const notFn = require('./not');

module.exports = {
    and: andFn,
    or: orFn,
    not: notFn
};
