'use strict';
const expect = require('chai').expect;
const intersect = require('../index').arrayIntersect;

describe('Array intersect function', () => {

    it('should make empty intersection for single empty array', function () {
        expect(intersect([])).to.be.empty;
    });

    it('should make empty intersection with empty array', function () {
        expect(intersect([], [3, 9, 12])).to.be.empty;
    });

    it('should be equal to single source array', function () {
        expect(intersect([3, 9, 12])).to.be.deep.equal([3, 9, 12]);
    });

    it('gives intersection equal one of many source duplicates', function () {
        expect(intersect([3, 9, 12], [3, 9, 12], [3, 9, 12], [3, 9, 12])).to.be.deep.equal([3, 9, 12]);
    });

    it('gives empty intersection #1', function () {
        expect(intersect([1, 2, 3], [4, 5, 6], [7, 8, 9])).to.be.empty;
    });

    it('gives empty intersection #2', function () {
        expect(intersect([1, 2, 3], [4, 5, 6], [4, 5, 6])).to.be.empty;
    });

    it('gives non empty intersection', function () {
        expect(intersect([1, 2, 3], [3, 4, 5], [3, 2]).length).to.be.equal(1);
    });
});
