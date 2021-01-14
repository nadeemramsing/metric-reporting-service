'use strict'

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

module.exports = main;

function main(req) {
    defaultStore.postValue(req.params.key, req.body.value);

    return {};
}

main._benchmark = function (req, storeName = 'object') {
    const store = require(`./../store/${storeName}.store`);

    store.postValue(req.params.key, req.body.value);

    return {};
}