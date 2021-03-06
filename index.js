'use strict';

const doesExtend = require('./lib/_does_extend');
const parsing = require('./lib/_parsing');
const privates = require('./lib/_privates_holder');
const lazyFlake = require('./lib/_lazy_flake');
const TypedException = require('./lib/_typed_exception');
const StatusException = require('./lib/_status_exception');
const pairs = require('./lib/_pairs');
const uniquePairs = require('./lib/_unique_pairs');
const arrayIntersect = require('./lib/_arrayIntersect');
const deductSet = require('./lib/_deduct_set');
const MultibufferReadableStream = require('./lib/streams/multi_buffer_readable_stream');
const BufferWritableStream = require('./lib/streams/buffer_writable_stream');
const JunkReadableStream = require('./lib/streams/junk_readable_stream');
const MustacheGroomer = require('./lib/_mustache_groomer');
const Timer = require('./lib/_timer');
const TokenBucket = require('./lib/throttle/token_bucket');
const expressThrottle = require('./lib/throttle/express_throttle');
const funk = require('./lib/funk');

module.exports = {
    doesExtend,
    lazyFlake,
    pairs,
    parsing,
    privates,
    uniquePairs,
    arrayIntersect,
    deductSet,
    exceptions: {
        TypedException,
        StatusException
    },
    streams: {
        MultibufferReadableStream,
        BufferWritableStream,
        JunkReadableStream
    },
    throttle: {
        TokenBucket,
        expressThrottle
    },
    funk,
    MustacheGroomer,
    Timer
};
