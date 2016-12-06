'use strict';
const expect = require('chai').expect;
const asynq = require('../index').asynq;

const obj = {

    producesResult(callback) {
        setTimeout(() => {
            callback(null, 'result')
        })
    },

    throwsException(callback){
        setTimeout(() => {
            callback(new Error('error'), null)
        })
    }
};

describe('asynq function', () => {

    before(() => {
        asynq(obj, 'producesResult');
        asynq(obj, 'throwsException');
    });

    it('should have new method returning result promise', function () {
        return obj.producesResultAsynq()
            .then(result => {
                expect(result).to.be.equal('result');
            })
    });

    it('should have new method returning rejected promise', function () {
        return obj.throwsExceptionAsynq()
            .then(result => {
                throw new Error('Incorrectly resolved promise')
            })
            .catch(err => {
                expect(err.message).to.be.equal('error');
            })
    });
});

