'use strict';
const expect = require('chai').expect;
const TypedException = require('../index').exceptions.TypedException;

describe('TypedException', () => {
    it('should extend Error', function () {
        const e = new TypedException('error message');
        expect(e).to.be.an.instanceof(Error);
    });

    it('should have name TypedException', function () {
        const e = new TypedException('error message');
        expect(e.name).to.equal('TypedException');
    });

    it('should have message', function () {
        const e = new TypedException('error message');
        expect(e.message).to.equal('error message');
    });

    it('should have stack', function () {
        const e = new TypedException('error message');
        expect(e.stack).to.exist;
    });
});
