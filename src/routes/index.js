const express = require('express');

const route = express.Router();

const talkerRoute = require('./talkerRoute');

route.use(talkerRoute);

module.exports = route;