'use strict';
const expect = require('chai').expect;
const TypedException = require('../index').exceptions.TypedException;
const StatusException = require('../index').exceptions.StatusException;

describe('TypedException', () => {
    it('should extend Error', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e).to.be.an.instanceof(Error);
    });

    it('should extend TypedException', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e).to.be.an.instanceof(TypedException);
    });

    it('should have name TypedException', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e.name).to.equal('StatusException');
    });

    it('should have type property', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e.type).to.equal('test-type');
    });

    it('should have statusCode property', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e.statusCode).to.equal(500);
    });

    it('should have message', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e.message).to.equal('error message');
    });

    it('should have stack', function () {
        const e = new StatusException('test-type', 500, 'error message');
        expect(e.stack).to.exist;
    });
});
