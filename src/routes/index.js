const express = require('express');

const route = express.Router();

const talker = require('./talkerRoute');

route.use(talker);

module.exports = route;