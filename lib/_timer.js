'use strict';

/**
 */
class Timer {
    /**
     */
    constructor() {
        this.startTime = null;
    }

    /**
     * @returns {Timer}
     */
    start() {
        this.reset();
        return this;
    }

    /**
     * @returns {Timer}
     */
    reset() {
        this.startTime = process.hrtime();
        return this;
    }

    /**
     * @returns {Number}
     */
    elapsed() {
        const diff = process.hrtime(this.startTime);
        return Math.round(((diff[0] * 1e9) + diff[1]) / 1000000);
    }
}

module.exports = Timer;
