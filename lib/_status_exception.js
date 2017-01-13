'use strict';
const TypedException = require('./_typed_exception');

/**
 */
class StatusException extends TypedException {
    /**
     * @param {String} type
     * @param {Number} statusCode
     * @param {String} message
     */
    constructor(type, statusCode, message) {
        super(message);
        this.type = type;
        this.statusCode = statusCode;
    }
}

module.exports = StatusException;
