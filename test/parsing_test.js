'use strict';
const expect = require('chai').expect;
const parsing = require('../index').parsing;

const obj = {};

describe('parsing utility', () => {

    it('should parse number string', function () {
        expect(parsing.parseNumber("23.4567")).to.be.equal(23.4567);
        expect(parsing.parseNumber("12")).to.be.equal(12);
        expect(parsing.parseNumber("0")).to.be.equal(0);
        expect(parsing.parseNumber("-3")).to.be.equal(-3);
        expect(parsing.parseNumber("asrt")).to.be.NaN;
    });

    it('should parse storage quota', function () {
        expect(parsing.parseQuotaString("3g")).to.be.equal(3 * 1073741824);
        expect(parsing.parseQuotaString("3G")).to.be.equal(3 * 1073741824);
        expect(parsing.parseQuotaString("3Gb")).to.be.equal(3 * 1073741824);
        expect(parsing.parseQuotaString("12m")).to.be.equal(12 * 1048576);
        expect(parsing.parseQuotaString("12M")).to.be.equal(12 * 1048576);
        expect(parsing.parseQuotaString("12Mb")).to.be.equal(12 * 1048576);
        expect(parsing.parseNumber("123")).to.be.equal(123);
    });
});

