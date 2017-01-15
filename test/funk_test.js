'use strict';
const _ = require('lodash');
const expect = require('chai').expect;
const f = require('../lib/funk');

describe('Funk functions', () => {

    it('NOT froduces correct result', function () {
        const fn = f.not(_.isInteger);
        expect(fn(12)).to.be.false;
        expect(fn(null)).to.be.true;
        expect(fn()).to.be.true;
        expect(fn([])).to.be.true;
        expect(fn(true)).to.be.true;
        expect(fn('abc')).to.be.true;
    });

    it('OR from empty function list produces false for any value', function () {
        expect(f.or()()).to.be.false;
    });

    it('OR from non empty list froduces correct results', function () {
        const fn = f.or(_.isInteger, _.isNull, _.isUndefined);
        expect(fn(12)).to.be.true;
        expect(fn(null)).to.be.true;
        expect(fn()).to.be.true;
        expect(fn([])).to.be.false;
        expect(fn(true)).to.be.false;
        expect(fn('abc')).to.be.false;
    });

    it('AND from empty function list produces true for any value', function () {
        expect(f.and()()).to.be.true;
    });

    it('OR from non empty list froduces correct results', function () {
        const fn = f.and(_.isInteger, f.not(_.isNull), f.not(_.isUndefined));
        expect(fn(12)).to.be.true;
        expect(fn(null)).to.be.false;
        expect(fn()).to.be.false;
        expect(fn([])).to.be.false;
        expect(fn(true)).to.be.false;
        expect(fn('abc')).to.be.false;
    });
});
