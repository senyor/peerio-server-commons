'use strict';

/**
 * An implementation of the Token Bucket algorithm.
 *
 * Basically, in network throttling, there are two "mainstream"
 * algorithms for throttling requests, Token Bucket and Leaky Bucket.
 * For restify, I went with Token Bucket.  For a good description of the
 * algorithm, see: http://en.wikipedia.org/wiki/Token_bucket
 *
 * In the options object, you pass in the total tokens and the fill rate.
 * Practically speaking, this means "allow `fill rate` requests/second,
 * with bursts up to `total tokens`".  Note that the bucket is initialized
 * to full.
 *
 * Also, in googling, I came across a concise python implementation, so this
 * is just a port of that. Thanks http://code.activestate.com/recipes/511490 !
 *
 * @private
 * @class
 */
class TokenBucket {
    /**
     * @param {Number} capacity the maximum burst.
     * @param {Number} fillRate the rate to refill tokens.
     */
    constructor(capacity, fillRate) {
        this.tokens = capacity || 100;
        this.capacity = this.tokens;
        this.fillRate = fillRate || 10;
        this.time = Date.now();
    }

    /**
     * Consume N tokens from the bucket.
     *
     * If there is not capacity, the tokens are not pulled from the bucket.
     *
     * @private
     * @function consume
     * @param    {Number}  tokens the number of tokens to pull out.
     * @returns  {Boolean}        true if capacity, false otherwise.
     */
    consume(tokens) {
        if (tokens <= this._fill()) {
            this.tokens -= tokens;
            return true;
        }
        return false;
    }

    /**
     * Fills the bucket with more tokens.
     *
     * Rather than do some whacky setTimeout() deal, we just approximate refilling
     * the bucket by tracking elapsed time from the last time we touched the bucket.
     *
     * Simply, we set the bucket size to min(totalTokens,
     *                                       current + (fillRate * elapsed time)).
     *
     * @private
     * @function _fill
     * @returns  {Number} the current number of tokens in the bucket.
     */
    _fill() {
        const now = Date.now();

        // reset account for clock drift (like DST)
        if (now < this.time) {
            this.time = now - 1000;
        }

        if (this.tokens < this.capacity) {
            const delta = this.fillRate * ((now - this.time) / 1000);
            this.tokens = Math.min(this.capacity, this.tokens + delta);
        }
        this.time = now;

        return this.tokens;
    }
}

module.exports = TokenBucket;
