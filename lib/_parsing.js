'use strict';

module.exports = {

    parseNumber(numStr) {
        if (/^(-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(numStr)) {
            return Number(numStr);
        }
        return NaN;
    },

    parseQuotaString(quotaStr, ErrConstructor) {
        const s = quotaStr.toLowerCase().replace(/\s/g, '').replace('mb', 'm').replace('gb', 'g');
        // if (process.env.DEBUG) { console.log(s); }
        const value = this.parseNumber(s.slice(0, -1));
        const multiplierToken = s.slice(-1);

        if ((multiplierToken !== 'm' && multiplierToken !== 'g') || isNaN(value)) {
            const msg = `Quota string "${quotaStr}" is invalid`;
            if (ErrConstructor) {
                throw new ErrConstructor({
                    type: 'app',
                    message: msg,
                    errorCode: 400
                });
            } else {
                throw new Error(msg);
            }
        }
        if (multiplierToken === 'm') {
            return value * 1048576;
        }
        if (multiplierToken === 'g') {
            return value * 1073741824;
        }
        return value;
    }
};
