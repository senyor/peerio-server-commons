'use strict';

module.exports = (a, b) => new Set([...a].filter(x => !b.has(x)));
