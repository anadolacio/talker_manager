const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const route = express.Router();

const pathSolution = path.resolve(__dirname, './talker.json');

route.get('/', async (_req, res) => {
    try {
        const result = await JSON.parse(fs.readFile(pathSolution, 'utf-8'));

        if (result) {
            return res.status(200).json(result);
        }
        return res.status(200).json([]);
    } catch (error) {
        return res(400).send({ message: `Erro de requisição: ${{ error }}` });
    }
});

module.exports = route;