const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const route = express.Router();

const pathSolution = path.resolve(__dirname, './talker.json');

route.get('/talker', async (_req, res) => {
  const result = await fs.readFile(pathSolution, 'utf-8');
  const data = JSON.parse(result);

  return res.status(200).json(data);
});

module.exports = route;