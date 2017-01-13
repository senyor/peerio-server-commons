'use strict';

const Readable = require('stream').Readable;
const crypto = require('crypto');
const DEFAULT_CHUNK_SIZE = 1024;
const Timer = require('../_timer');

/**
 * Implementation of readable stream which streams garbage bytes
 */
class JunkReadableStream extends Readable {

    /**
     * @param {String} name - Stream name
     * @param {Number} contentLength - Stream content length
     * @param {Object} logger - Winston logger instance
     */
    constructor(name, contentLength, logger) {
        super();
        this.contentLength = contentLength;
        this.name = name;
        this.logger = logger;
        this.streamed = 0;
        this.timer = new Timer();
        this.started = false;
    }

    /**
     * @param {*} params
     * @returns {undefined}
     */
    log(...params) {
        if (this.logger) {
            this.logger.info(...params);
        }
    }

    /**
     * Override read event handler for readable stream
     * @private
     * @param {number} s size of chunk
     * @returns {undefined}
     */
    _read(s) {
        if (!this.started) {
            this.timer.start();
            this.started = true;
        }
        const size = s || DEFAULT_CHUNK_SIZE;
        const bufferSize = Math.min(size, this.contentLength - this.streamed);
        if (bufferSize <= 0) {
            this.log(`Stream ${this.name} finished in ${this.timer.elapsed()}ms`);
            this.push(null);
            return;
        }
        this.log(`Stream ${this.name} produced ${bufferSize} bytes.`);
        this.streamed += bufferSize;
        this.push(crypto.randomBytes(bufferSize));
    }
}

module.exports = JunkReadableStream;
