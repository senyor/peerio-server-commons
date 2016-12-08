/* eslint no-sync: "off" */
'use strict';
const fs = require('fs');
const _ = require('lodash');
const privates = require('./_privates_holder');

/**
 * Adding post rendering transformation to mustache resulting string
 * Builder pattern.
 * Add transformation and then modify Mustache instance
 */
class MustacheGroomer {
    /**
     */
    constructor() {
        privates.setPrivate(this, 'transforms', []);
        const configPath = process.env.MUSTACHE_GROOMER;
        if (configPath && fs.existsSync(configPath)) {
            try {
                const config = JSON.parse(fs.readFileSync(configPath));
                const substitutions = _.get(config, 'substitutions') || [];
                substitutions.forEach(substitutionObj => {
                    if (substitutionObj.pattern) {
                        const r = new RegExp(substitutionObj.pattern, substitutionObj.flags);
                        const replacement = substitutionObj.replacement || '';
                        this.addSubstitution(r, replacement);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    /**
     * @returns {MustacheGroomer} - MustacheGroomer instance
     */
    clearTransforms() {
        privates.setPrivate(this, 'transforms', []);
        return this;
    }

    /**
     * @param {Function} fn - function of type {String} => {String}
     * @returns {MustacheGroomer}  - MustacheGroomer instance
     */
    addTransform(fn) {
        privates.getPrivate(this, 'transforms').push(fn);
        return this;
    }

    /**
     * @param {Mustache} mustache - instance of Mustache
     * @param {Function} mustache.render - render function
     * @returns {Mustache} - instance of Mustache with modified render
     */
    groom(mustache) {
        const oldRender = mustache.render.bind(mustache);
        const transforms = privates.getPrivate(this, 'transforms');
        mustache.render = (template, view, partials) => {
            const rendered = oldRender(template, view, partials);
            return transforms.reduce((str, fn) => fn(str), rendered);
        };
        return mustache;
    }

    /**
     * @param {RegExp|String} pattern The pattern to replace.
     * @param {Function|String} replacement The match replacement.
     * @returns {MustacheGroomer}  - MustacheGroomer instance
     */
    addSubstitution(pattern, replacement) {
        privates.getPrivate(this, 'transforms').push(str => _.replace(str, pattern, replacement));
        return this;
    }
}

module.exports = MustacheGroomer;
