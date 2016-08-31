'use strict';
const _ = require('lodash');

module.exports = {

    parseNumber(numStr) {
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(numStr)) {
            return Number(numStr);
        } else {
            return NaN;
        }
    },

    parseQuotaString(quotaStr, errConstructor) {
        const s = quotaStr.toLowerCase().replace(/\s/g, '').replace('mb', 'm').replace('gb', 'g');
        // if (process.env.DEBUG) { console.log(s); }
        const value = this.parseNumber(s.slice(0, -1));
        const multiplierToken = s.slice(-1);

        if ((multiplierToken != 'm' && multiplierToken != 'g') || isNaN(value)) {
            const msg = `Quota string "${quotaStr}" is invalid`;
            if (errConstructor) {
                throw new errConstructor({
                    type: 'app',
                    message: msg,
                    errorCode: 400
                });
            } else {
                throw new Error(msg);
            }
        }
        const multiplier = (multiplierToken == 'm') ? 1048576 : (multiplierToken == 'g') ? 1073741824 : 0;
        return value * multiplier;
    }
};
