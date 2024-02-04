const { readFile, writeFile } = require('fs/promises');

const path = require('path');

const pathSolution = path.resolve(__dirname, '../talker.json');

const readFileData = async () => {
    try {
      const data = await readFile(pathSolution, 'utf-8');

      return JSON.parse(data);
    } catch (error) {
        throw new Error(`Erro ao ler o arquivo: ${error}`);
    }
};

const writeFileData = async (data) => {
    try {
        await writeFile(pathSolution, JSON.stringify(data));
    } catch (error) {
        throw new Error(`Erro ao escrever no arquivo: ${error}`);
    }
};

const getTalkers = async () => {
    const talkers = await readFileData();
    return talkers;
  };
  

module.exports = {
    readFileData,
    writeFileData,
    getTalkers,
};