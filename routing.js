'use strict'

const express = require('express');

const { wrap } = require('./utils/controller.util');

module.exports = express.Router()
    .post('/metric/:key', wrap(require('./methods/postMetricByKey')))
    .get('/metric/:key/sum', wrap(require('./methods/getMetricSumByKey')));
