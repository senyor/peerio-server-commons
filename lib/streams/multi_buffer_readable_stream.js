'use strict';

const _ = require('lodash');
const Readable = require('stream').Readable;
const privates = require('../_privates_holder');
const DEFAULT_CHUNK_SIZE = 1024;

/**
 * Implementation of readable stream which streams contents of buffers array
 */
class MultibufferReadableStream extends Readable {

    /**
     * @param {Object} opts - Options
     * @param {String} opts.chunkSize - Chunk size in bytes
     * @param {Array.<Buffer>} buffers - source buffers
     */
    constructor(opts, buffers) {
        super();
        let options = opts;
        let bufferArray = buffers;

        if (_.isArray(options)) {
            bufferArray = options;
            options = {};
        }
        bufferArray = bufferArray || [];
        options.chunkSize = options.chunkSize || DEFAULT_CHUNK_SIZE;

        const ranges = [];
        const contentLength = bufferArray.reduce((count, buffer) => {
            ranges.push([count, count + buffer.length]);
            return count + buffer.length;
        }, 0);

        privates.setPrivate(this, 'chunkSize', options.chunkSize);
        privates.setPrivate(this, 'buffers', bufferArray);
        privates.setPrivate(this, 'contentLength', contentLength);
        privates.setPrivate(this, 'ranges', ranges);
        this.pointer = 0;
    }

    /**
     * @returns {Number} - Size of streaming chunk in bytes
     */
    get chunkSize() {
        return privates.getPrivate(this, 'chunkSize');
    }

    /**
     * @returns {Array.<Buffer>} - Source buffers array
     */
    get buffers() {
        return privates.getPrivate(this, 'buffers');
    }

    /**
     * @returns {Number} - Stream content length
     */
    get contentLength() {
        return privates.getPrivate(this, 'contentLength');
    }

    /**
     * Array of size 2 array elements. Each element reperesents start and end of each source buffer within stream data
     * @returns {Array.<Array.<Number>>} - byte ranges in stream correspondent to source buffers
     */
    get ranges() {
        return privates.getPrivate(this, 'ranges');
    }

    /**
     * Override read event handler for readable stream
     * @private
     * @param {number} s size of chunk
     * @returns {undefined}
     */
    _read(s) {
        const size = s || this.chunkSize;
        const bufferSize = Math.min(size, this.contentLength - this.pointer);
        if (bufferSize <= 0) {
            this.push(null);
            return;
        }

        const nextPointer = this.pointer + bufferSize;
        const writeBuffer = new Buffer(bufferSize);
        let written = 0;
        this.ranges.forEach((range, index) => {
            const start = Math.max(this.pointer, range[0]) - range[0];
            const end = Math.min(nextPointer, range[1]) - range[0];

            if (end > start) {
                this.buffers[index].copy(writeBuffer, written, start, end);
                written += end - start;
            }
        });

        this.pointer = nextPointer;
        this.push(writeBuffer);
    }
}

module.exports = MultibufferReadableStream;
