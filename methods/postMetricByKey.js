'use strict'

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

module.exports = (req) => {
    defaultStore.postValue(req.params.key, req.body.value);

    return {};
}