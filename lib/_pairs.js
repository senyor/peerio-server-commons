'use strict';

module.exports = function pairs(arr) {
    const result = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i; j < arr.length - 1; j++) {
            result
                .push([arr[i], arr[j + 1]]
                    .sort((a, b) => {
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                        return 0;
                    }));
        }
    }
    return result;
};
