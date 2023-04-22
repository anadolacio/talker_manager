const express = require('express');

const fs = require('fs/promises');
const path = require('path');
const tokenBuilder = require('./utils/tokenBuilder');
const { emailValidation, passwordValidation } = require('./middleware/fieldsValidation');
const { readFileData, writeFileData } = require('./utils/personData');

const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedValidation,
  rateValidation,
} = require('./middleware/newPersonValidation');

const app = express();
const pathSolution = path.resolve(__dirname, './talker.json');
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (_req, res) => {
  const result = await fs.readFile(pathSolution, 'utf-8');
  const data = JSON.parse(result);
  
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const way = await fs.readFile(pathSolution, 'utf-8');
      const citizens = JSON.parse(way);

      const result = citizens.find((citzen) => citzen.id === +id);

      if (result) return res.status(200).json(result);

      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
      res.status(404).send({ message: `Erro inesperado: ${error}` });
  }
});

app.post('/login', emailValidation, passwordValidation, async (req, res) => {
  try {
      const fieldBody = req.body;
      const loginField = ['email', 'password'];

      const fieldValidation = loginField.every((field) => field in fieldBody);

      const token = tokenBuilder();

      if (fieldValidation) return res.status(200).json({ token });
      return res
      .status(400)
      .send({ message: 'É necessário preencher todos os campos!' });
    } catch (error) {
      return res.status(400).send({ message: `Erro inesperado: ${error}` });
    }
});

app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedValidation,
  rateValidation,
  async (req, res) => {
      try {
          const require = req.body;
          const dataTalker = await readFileData();

          const newPerson = { id: dataTalker.length + 1, ...require };

          dataTalker.push(newPerson);

          await writeFileData(dataTalker);

          return res.status(201).json(newPerson);
      } catch (error) {
          return res
              .status(400)
              .send({ message: `Erro inesperado: ${error}` });
      }
  },
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;
