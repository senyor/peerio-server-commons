'use strict';

const TypedException = require('./_typed_exception');

/**
 */
class StatusException extends TypedException {
    /**
     * @param {String} type
     * @param {Number} statusCode
     * @param {String} message
     * @param {Boolean} suppressStackTrace
     */
    constructor(type, statusCode, message, suppressStackTrace) {
        super(message, suppressStackTrace);
        this.type = type;
        this.statusCode = statusCode;
    }
}

module.exports = StatusException;
