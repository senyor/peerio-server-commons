'use strict';

const Mustache = require('mustache');
const MustacheGroomer = require('../lib/_mustache_groomer');
const expect = require('chai').expect;

process.env.MUSTACHE_GROOMER = './test/groomer.config';

const groomer = new MustacheGroomer();

const groomedMustache = groomer.groom(Mustache);

const template = `Dear {{name}},

I am so glad to inform u that I have fallen in Love with
you since the first day when i met with you.
I would like to present myself as a prospective lover.
Our love affair would be on probation for a period of {{period}} months.
Upon completion of probation, there will be performance appraisal leading to promotion from lover to spouse. 
Your's {{author}}`;

const vars = {
    name: "Chris",
    author: "Mary",
    period: "two"
};

const expected = `Dear Miguel Maria Franco Picatoste,

I am so glad to inform u that I have fallen in Love with
you since the first day when i met with you.
I would like to present myself as a prospective lover.
Our love affair would be on probation for a period of two months.
Upon completion of probation, there will be performance appraisal leading to promotion from lover to spouse. 
Your's Florencita Maria Bertotti`;

describe('MustacheGroomer', () => {

    it('should make proper replacements', function () {
        const result = groomedMustache.render(template, vars);
        expect(result).to.equal(expected);
    });

});
