'use strict';
const expect = require('chai').expect;
const doesExtend = require('../lib/_does_extend');

class Base {}
class A extends Base {}
class B extends A {}
class C {}

describe('doesExtend function', () => {

    it('Checks correctly', function () {
        expect(doesExtend(Base, Base)).to.be.true;
        expect(doesExtend(A, Base)).to.be.true;
        expect(doesExtend(B, Base)).to.be.true;
        expect(doesExtend(B, A)).to.be.true;
        expect(doesExtend(C, Base)).to.be.false;
    });
});
