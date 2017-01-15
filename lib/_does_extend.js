'use strict';
module.exports = (clazz, parentClazz) => clazz === parentClazz || clazz.prototype instanceof parentClazz;
