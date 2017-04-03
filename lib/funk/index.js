'use strict';
const _ = require('lodash');
const andFn = require('./and');
const orFn = require('./or');
const notFn = require('./not');
const composeFn = require('./compose');

module.exports = {
    and: andFn,
    or: orFn,
    not: notFn,
    compose: composeFn,
    map: fn => _.curryRight(_.map)(fn)
};
