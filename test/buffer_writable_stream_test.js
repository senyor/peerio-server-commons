'use strict';
const expect = require('chai').expect;
const BufferWritableStream = require('../index').streams.BufferWritableStream;

describe('BufferWritableStream', () => {

    it('should result in empty Buffer if nothing was written', function () {
        const st = new BufferWritableStream();
        st.end();
        expect(st.buffer).to.deep.equal(Buffer.from([]));
    });

    it('should result in buffer when binary data written', function () {
        const st = new BufferWritableStream();
        st.write(Buffer.from([0, 1, 2, 3]));
        st.write(Buffer.from([0, 1, 2, 3]));
        st.write(Buffer.from([7, 8, 9, 10]));
        st.end();
        expect(st.buffer).to.deep.equal(Buffer.from([0, 1, 2, 3, 0, 1, 2, 3, 7, 8, 9, 10]));
    });

    it('should result in buffer when string data written', function () {
        const st = new BufferWritableStream();
        st.write('Peerio');
        st.write(' ');
        st.write('is');
        st.write(' ');
        st.write('great!');
        st.end();
        expect(st.buffer).to.deep.equal(
            Buffer.from([80, 101, 101, 114, 105, 111, 32, 105, 115, 32, 103, 114, 101, 97, 116, 33])
        );
    });
});
