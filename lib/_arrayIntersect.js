'use strict';
module.exports = function arrayIntersect() {
    let shortestArr;
    const restArrs = [];
    for (const arr of arguments) {
        if (!shortestArr) {
            shortestArr = arr;
        } else if (shortestArr.length > arr.length) {
            restArrs.push(shortestArr);
            shortestArr = arr;
        } else {
            restArrs.push(arr);
        }
    }
    if (!shortestArr || shortestArr.length === 0) {
        return [];
    }
    const resultMap = shortestArr.reduce((m, el) => {
        m.set(el, 0);
        return m;
    }, new Map());

    for (let i = 0; i < restArrs.length; i++) {
        restArrs[i].forEach(el => {
            const val = resultMap.get(el);
            if (val === i) {
                resultMap.set(el, val + 1);
            } else if (val && val < i) {
                resultMap.delete(el);
            }
        });
    }
    const result = [];
    resultMap.forEach((value, key) => {
        if (value === restArrs.length) {
            result.push(key);
        }
    });
    return result;
};
