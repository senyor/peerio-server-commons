'use strict';
const _ = require('lodash');
const pairs = require('./_pairs');


module.exports = function (arr) {
    return _.uniqBy(pairs(arr), el => el.sort().join('.'));
};
