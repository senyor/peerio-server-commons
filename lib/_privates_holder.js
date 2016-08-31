'use strict';
const _ = require('lodash');

const privates = new WeakMap();

module.exports = {

    setPrivate: (obj, name, value) => {
        const objProps = privates.get(obj) || {};
        objProps[name] = value;
        privates.set(obj, objProps);
    },

    getPrivate: (obj, property) => {
        const objProps = privates.get(obj);
        return _.get(objProps, property);
    }
};
