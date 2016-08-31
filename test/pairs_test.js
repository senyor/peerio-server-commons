'use strict';
const expect = require('chai').expect;
const pairs = require('../index').pairs;

describe('Pairs function', () => {
    it('should generate empty pairs collection out of empty elements collection', function () {
        const p = pairs([]);
        expect(p).to.be.empty;
    });

    it('should generate pairs collection out of elements collection of length 1', function () {
        const p = pairs([1]);
        expect(p).to.be.empty;
    });

    it('should generate collection of size 1 out of elements collection of length 2', function () {
        const p = pairs([1, 2]);
        expect(p.length).to.equal(1);
    });

    it('should generate collection of size 3 out of elements collection of length 3', function () {
        const p = pairs([1, 2, 3]);
        expect(p.length).to.equal(3);
        expect(p[0]).to.be.deep.equal([1, 2]);
        expect(p[1]).to.be.deep.equal([1, 3]);
        expect(p[2]).to.be.deep.equal([2, 3]);
    });
});
