'use strict';

const Writable = require('stream').Writable;

/**
 * BufferWritableStream
 */
class BufferWritableStream extends Writable {

    /**
     */
    constructor() {
        super();
        this.data = [];
    }

    /**
     * @returns {Buffer}
     */
    get buffer() {
        return Buffer.concat(this.data);
    }

    /**
     * @param {Buffer|String} chunk
     * @param {String} enc
     * @param {Function} next
     * @returns {*}
     * @private
     */
    _write(chunk, enc, next) {
        this.data.push(chunk);
        next();
    }
}

module.exports = BufferWritableStream;
