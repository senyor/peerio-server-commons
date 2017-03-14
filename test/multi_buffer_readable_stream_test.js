'use strict';
const expect = require('chai').expect;
const MultibufferReadableStream = require('../index').streams.MultibufferReadableStream;

describe('BufferWritableStream', () => {

    it('should result in empty Buffer if nothing was written', function () {
        const buffers = [
            Buffer.from([0, 1, 2, 3]),
            Buffer.from([0, 1, 2, 3]),
            Buffer.from([7, 8, 9, 10])
        ];
        const st = new MultibufferReadableStream(buffers);
        expect(st.read(2)).to.deep.equal(Buffer.from([0, 1]));
        expect(st.read(6)).to.deep.equal(Buffer.from([2, 3, 0, 1, 2, 3]));
        expect(st.read(6)).to.deep.equal(Buffer.from([7, 8, 9, 10]));
        expect(st.read(6)).to.be.null;
    });
});
