'use strict';

const Writable = require('stream').Writable;

class BufferWritableStream extends Writable {

    constructor() {
        super();
        this.data = [];
    }

    get buffer() {
        return Buffer.concat(this.data);
    }

    _write(chunk, enc, next) {
        this.data.push(chunk);
        next();
    }
}

module.exports = BufferWritableStream;
