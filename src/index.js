const express = require('express');
const talkerRoute = require('./routes/talkerRoute');
const fs = require('fs/promises');
const path = require('path');
const pathSolution = path.resolve(__dirname, './talker.json')

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const result = await fs.readFile(pathSolution, 'utf-8');
  const data = JSON.parse(result);
  return res.status(200).json(data);
});

module.exports = app;
