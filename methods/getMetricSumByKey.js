'use strict'

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

module.exports = (req) => {
    return { 'value': defaultStore.getSumByKey(req.params.key) };
}