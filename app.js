'use strict'

const express = require('express');
const helmet = require('helmet');

const { port } = require('./app.config');

const app = new express();

app.use(helmet());

app.listen(port, console.log.apply(null, ['Server is listening on Port', port]));