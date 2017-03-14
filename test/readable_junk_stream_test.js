'use strict';
const Q = require('q');
const expect = require('chai').expect;
const BufferWritableStream = require('../index').streams.BufferWritableStream;
const JunkReadableStream = require('../index').streams.JunkReadableStream;

describe('Readable Junk Stream', () => {

    it('should produce empty stream if content length is zero', function () {
        const st = new JunkReadableStream('testStream', 0);
        const destination = new BufferWritableStream();
        st.pipe(destination);
        expect(destination.buffer).to.deep.equal(Buffer.from([]));
    });

    it('should produce non empty stream of 1024 length', function () {
        const st = new JunkReadableStream('testStream', 1024);
        const destination = new BufferWritableStream();
        return Q.Promise((resolve, reject) => {
            destination.on('finish', () => {
                resolve(destination.buffer);
            });
            destination.on('error', err => {
               reject(err);
            });
            st.pipe(destination);
        })
            .then(buffer => {
                expect(buffer.length).to.equal(1024);
            })
    });

    it('should produce non empty stream of 1024 * 1024 length', function () {
        const st = new JunkReadableStream('testStream', 1024 * 1024);
        const destination = new BufferWritableStream();
        return Q.Promise((resolve, reject) => {
            destination.on('finish', () => {
                resolve(destination.buffer);
            });
            destination.on('error', err => {
                reject(err);
            });
            st.pipe(destination);
        })
            .then(buffer => {
                expect(buffer.length).to.equal(1024 * 1024);
            })
    });

    it('should produce non empty stream of 100 length', function () {
        const st = new JunkReadableStream('testStream', 100);
        const destination = new BufferWritableStream();
        return Q.Promise((resolve, reject) => {
            destination.on('finish', () => {
                resolve(destination.buffer);
            });
            destination.on('error', err => {
                reject(err);
            });
            st.pipe(destination);
        })
            .then(buffer => {
                expect(buffer.length).to.equal(100);
            })
    });
});
