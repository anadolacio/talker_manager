const express = require('express');

const route = express.Router();

const talker = require('./talkersRoute');

route.use(talker);

module.exports = route;