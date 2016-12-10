'use strict';

class Timer {

    constructor() {
        this.startTime = null;
    }

    start() {
        this.reset();
        return this;
    }

    reset() {
        this.startTime = process.hrtime();
        return this;
    }

    elapsed() {
        const diff = process.hrtime(this.startTime);
        return Math.round((diff[0] * 1e9 + diff[1]) / 1000000);
    }
}

module.exports = Timer;
