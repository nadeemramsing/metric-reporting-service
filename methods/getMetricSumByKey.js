'use strict'

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

module.exports = main;

function main(req) {
    return { 'value': defaultStore.getSumByKey(req.params.key) };
}

main._benchmark = function (req, storeName = 'object') {
    const store = require(`./../store/${storeName}.store`);

    return { 'value': store.getSumByKey(req.params.key) };
}