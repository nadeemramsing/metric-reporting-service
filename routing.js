'use strict'

const express = require('express');

const { wrap } = require('./utils/controller.util');
const { postMetricByKey, getMetricSumByKey } = require('./methods');

module.exports = express.Router()
    .post('/metric/:key', wrap(postMetricByKey))
    .get('/metric/:key/sum', wrap(getMetricSumByKey));
