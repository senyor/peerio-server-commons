'use strict';
module.exports = function (arr) {
    const pairs = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i; j < arr.length - 1; j++) {
            pairs.push([arr[i], arr[j + 1]].sort((a, b) => a > b ? 1 : (a < b ? -1 : 0)));
        }
    }
    return pairs;
};
