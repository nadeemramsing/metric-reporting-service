'use strict'

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const { port, prod } = require('./app.config');

const app = new express();

app.use(helmet());
app.use(cors({
    methods: ['GET', 'POST']
}));
app.use(morgan(prod ? 'tiny' : 'combined'));
app.use(bodyParser.json());
app.use(compression());

app.use('/', require('./routing'));

app.listen(port, console.log.apply(null, ['Server is listening on Port', port]));