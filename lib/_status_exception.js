'use strict';
const TypedException = require('./_typed_exception');

class StatusException extends TypedException {
    constructor(type, statusCode, message) {
        super(message);
        this.type = type;
        this.statusCode = statusCode;
    }
}

module.exports = StatusException;
