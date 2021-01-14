'use strict'

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

module.exports = (req, storeName = 'object') => {
    const store = storeName ? require(`./../store/${storeName}.store`) : defaultStore;

    return { 'value': store.getSumByKey(req.params.key) };
};