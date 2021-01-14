module.exports = {
    getMetricSumByKey,
    postMetricByKey
};

const config = require('./../app.config');
const store = require(`./../store/${config.defaultStore}.store`);

function getMetricSumByKey(req) {
    return { 'value': store.getSumByKey(req.params.key) };
}

function postMetricByKey(req) {
    store.postValue(req.params.key, req.body.value, req.body.date);

    return {};
}