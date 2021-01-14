module.exports = {
    getMetricSumByKey,
    postMetricByKey
};

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

function getMetricSumByKey(req) {
    return { 'value': defaultStore.getSumByKey(req.params.key) };
}

function postMetricByKey(req) {
    defaultStore.postValue(req.params.key, req.body.value);

    return {};
}