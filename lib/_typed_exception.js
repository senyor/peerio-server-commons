'use strict';
/**
 * TypedException
 */
class TypedException extends Error {
    /**
     * @param {String} message
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

module.exports = TypedException;
