'use strict';
const expect = require('chai').expect;
const uniquePairs = require('../index').uniquePairs;

describe('Unique Pairs function', () => {
    it('should generate empty pairs collection out of empty elements collection', function () {
        const p = uniquePairs([]);
        expect(p).to.be.empty;
    });

    it('should generate pairs collection out of elements collection of length 1', function () {
        const p = uniquePairs([1]);
        expect(p).to.be.empty;
    });

    it('should generate collection of size 1 out of elements collection of length 2', function () {
        const p = uniquePairs([1, 2]);
        expect(p.length).to.equal(1);
    });

    it('should generate collection of size 3 out of elements collection of length 3', function () {
        const p = uniquePairs([1, 2, 3]);
        expect(p.length).to.equal(3);
    });

    it('should generate unique pairs', function () {
        const p = uniquePairs([1, 1, 1]);
        console.log(p);
        expect(p.length).to.equal(1);
    });
});
