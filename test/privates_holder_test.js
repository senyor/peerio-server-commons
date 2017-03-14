'use strict';
const expect = require('chai').expect;
const privates = require('../index').privates;

const obj = {};

describe('privates holder object', () => {

    it('chould return undefined if privates did not set', function () {
        expect(privates.getPrivate(obj, 'someProperty')).to.be.undefined;
    });

    it('should return same value that was set', function () {
        privates.setPrivate(obj, 'someProperty', Buffer.from([100, 200, 300]));
        expect(privates.getPrivate(obj, 'someProperty')).to.be.deep.equal(Buffer.from([100, 200, 300]));
    });
});
