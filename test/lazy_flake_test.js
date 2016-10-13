'use strict';
const expect = require('chai').expect;
const intersect = require('../index').lazyFlake;

describe('LazyFlake', () => {

    it('should make no double ids in 10000', function () {
        const cache = [];
        for(let i = 0; i < 1000000; i++){
            const id = lf.newId();
            if(cache.includes(id)){
                throw new Error(id);
            } else {
                cache.push(id);
                console.log(id)
            }
        }
    });
});
