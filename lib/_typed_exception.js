'use strict';

const privates = require('./_privates_holder');

/**
 * TypedException
 */
class TypedException extends Error {
    /**
     * @param {String} message
     * @param {Boolean} suppressStackTrace
     */
    constructor(message, suppressStackTrace) {
        super(message);
        this.name = this.constructor.name;
        this.type = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
            this.shadowStack = this.stack;
            this.stack = undefined;
        } else {
            this.shadowStack = (new Error(message)).stack;
        }
        this.suppressStackTrace = suppressStackTrace || false;
    }

    /**
     * @returns {Array}
     */
    get shadowStack() {
        return privates.getPrivate(this, 'shadowStack') || [];
    }

    /**
     * @param  {Array} arr
     */
    set shadowStack(arr) {
        privates.setPrivate(this, 'shadowStack', arr);
    }

    /**
     * @returns {Boolean}
     */
    get suppressStackTrace() {
        return Boolean(privates.getPrivate(this, 'suppressStackTrace'));
    }

    /**
     * @param {Boolean} value
     */
    set suppressStackTrace(value) {
        privates.setPrivate(this, 'suppressStackTrace', Boolean(value));
        if (this.suppressStackTrace) {
            this.stack = undefined;
        } else {
            this.stack = this.shadowStack;
        }
    }
}

module.exports = TypedException;
