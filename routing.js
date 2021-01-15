'use strict'

const express = require('express');

const validate = require('./middlewares/validation.middleware');

const { wrap } = require('./utils/controller.util');
const { postMetricByKey, getMetricSumByKey } = require('./methods');
const { schemaPostValueParams, schemaPostValueBody, schemaGetSumBody } = require('./validations');

module.exports = express.Router()
    .post('/metric/:key',
        validate(schemaPostValueParams, 'params'),
        validate(schemaPostValueBody, 'body'),
        wrap(postMetricByKey)
    )
    .get('/metric/:key/sum', validate(schemaGetSumBody, 'params'), wrap(getMetricSumByKey));
