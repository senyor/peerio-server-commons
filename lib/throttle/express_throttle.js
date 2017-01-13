/* eslint complexity: "warn" */

// Refactored version of https://github.com/restify/plugins/blob/master/lib/plugins/throttle.js
// Copyright 2012 Mark Cavage <mcavage@gmail.com> All rights reserved.

'use strict';
const LRU = require('lru-cache');
const TokenBucket = require('./token_bucket');
const TypedException = require('../_typed_exception');

/**
 */
class ThrottleException extends TypedException {
}

// --- Internal Class (TokenTable)
/**
 * Just a wrapper over LRU that supports put/get to store token -> bucket
 * mappings.
 * @private
 * @class
 */
class TokenTable {
    /**
     * @param {Number} size  size of the LRU
     */
    constructor(size) {
        this.table = new LRU(size || 10000);
    }

    /**
     * puts a value in the token table
     * @private
     * @function put
     * @param {String}      key   a name
     * @param {TokenBucket} value a TokenBucket
     * @returns {undefined}
     */
    put(key, value) {
        this.table.set(key, value);
    }

    /**
     * puts a value in the token table
     * @param {String} key
     * @returns {TokenBucket}
     */
    get(key) {
        return (this.table.get(key));
    }
}

/**
 * Helper function
 * Checks if only one array item is truthy
 * @param {Array.<*>} items
 * @returns {Boolean}
 */
function xor(items) {
    let x = false;
    for (let i = 0; i < items.length; i++) {
        if (items[i] && !x) {
            x = true;
        } else if (items[i] && x) {
            return false;
        }
    }
    return x;
}

// --- Exported API

/**
 * Creates an API rate limiter that can be plugged into the standard
 * express request handling pipeline.
 *
 * This throttle gives you three options on which to throttle:
 * username, IP address and 'X-Forwarded-For'. IP/XFF is a /32 match,
 * so keep that in mind if using it.  Username takes the user specified
 * on req.username (which gets automagically set for supported Authorization
 * types; otherwise set it yourself with a filter that runs before this).
 *
 * In both cases, you can set a `burst` and a `rate` (in requests/seconds),
 * as an integer/float.  Those really translate to the `TokenBucket`
 * algorithm, so read up on that (or see the comments above...).
 *
 * In either case, the top level options burst/rate set a blanket throttling
 * rate, and then you can pass in an `overrides` object with rates for
 * specific users/IPs.  You should use overrides sparingly, as we make a new
 * TokenBucket to track each.
 *
 * On the `options` object ip and username are treated as an XOR.
 *
 * An example options object with overrides:
 *
 *  {
 *    burst: 10,  // Max 10 concurrent requests (if tokens)
 *    rate: 0.5,  // Steady state: 1 request / 2 seconds
 *    ip: true,   // throttle per IP
 *    overrides: {
 *      '192.168.1.1': {
 *        burst: 0,
 *        rate: 0    // unlimited
 *    }
 *  }
 *
 * @public
 * @function throttle
 * @throws   {Error} Error when there are too many requests
 * @param    {Object} opts - required options with:
 *                   - {Number} burst (required).
 *                   - {Number} rate (required).
 *                   - {Boolean} ip (optional).
 *                   - {Boolean} username (optional).
 *                   - {Boolean} xff (optional).
 *                   - {Object} overrides (optional).
 *                   - {Object} tokensTable: a storage engine this plugin will
 *                              use to store throttling keys -> bucket mappings.
 *                              If you don't specify this, the default is to
 *                              use an in-memory O(1) LRU, with 10k distinct
 *                              keys.  Any implementation just needs to support
 *                              put/get.
 *                   - {Number} maxKeys: If using the default implementation,
 *                              you can specify how large you want the table to
 *                              be.  Default is 10000.
 *                   - {Function} log (optional): winston logger instance
 * @returns  {Function}
 */
function throttle(opts) {
    const options = opts || {};

    // Throttle can be only by IP or by xff (x-forwarded-for) or by username exclusively
    if (!xor([options.ip, options.xff, options.username])) {
        throw new Error('(ip ^ username ^ xff)');
    }

    const table = options.tokensTable || new TokenTable(options.maxKeys);

    /**
     * @param {Object} req - http reqest
     * @param {Object} res - http response
     * @param {Function} next
     * @returns {*}
     */
    const rateLimit = (req, res, next) => {
        let attr,
            burst = options.burst || 100,
            rate = options.rate || 10,
            bucket;

        if (options.ip) {
            attr = req.connection.remoteAddress;
        } else if (options.xff) {
            attr = req.headers['x-forwarded-for'];
        } else if (options.username) {
            attr = req.username;
        } else {
            if (options.log) {
                options.log.warn('Invalid throttle configuration');
            }
            return (next());
        }

        // Before bothering with overrides, see if this request
        // even matches
        if (!attr) {
            return (next());
        }

        // Check the overrides
        if (options.overrides &&
            options.overrides[attr] &&
            options.overrides[attr].burst !== undefined &&
            options.overrides[attr].rate !== undefined) {
            burst = options.overrides[attr].burst;
            rate = options.overrides[attr].rate;
        }

        if (!rate || !burst) {
            return (next());
        }

        bucket = table.get(attr);

        if (!bucket) {
            bucket = new TokenBucket(burst, rate);
            table.put(attr, bucket);
        }
        if (options.log) {
            options.log.info('Throttle(%s): num_tokens= %d', attr, bucket.tokens);
        }

        if (!bucket.consume(1)) {
            if (options.log) {
                options.log.error({
                    address: req.connection.remoteAddress || '?',
                    method: req.method,
                    url: req.url,
                    user: req.username || '?',
                    throttledByAttribute: attr
                }, 'Throttling');
            }
            const msg = `You have exceeded your request rate of ${rate} r/s.`;
            return (next(new ThrottleException(msg)));
        }

        return (next());
    };

    return (rateLimit);
}

module.exports = throttle;
