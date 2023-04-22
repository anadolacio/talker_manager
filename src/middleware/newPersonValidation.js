const tokenValidation = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: 'Token não encontrado' });
    }

    const tokenValid = token.length === 16 && typeof token === 'string';

    if (!tokenValid) {
        return res.status(401).send({ message: 'Token inválido' });
    }

    return next();
};

const nameValidation = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.length === 0) {
        return res
            .status(400)
            .send({ message: 'O campo "name" é obrigatório' });
    }

    const nameValid = name.length >= 3;

    if (!nameValid) {
        return res
            .status(400)
            .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    return next();
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }

    const ageValid = age >= 18 && Number.isInteger(age);

    if (!ageValid) {
        return res.status(400).send({
            message:
                'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }

    return next();
};

const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    const validFields = ['watchedAt', 'rate'];
    if (!talk) {
        return res.status(400).send({
            message:
            'O campo "talk" é obrigatório',
        });
    }
    const talkValid = Object.keys(talk).every((key) => validFields.includes(key));
    if (!talkValid) {
        return res.status(400).send({
            message:
            'O campo "talk" é obrigatório',
        });
    }
    return next();
};

const watchedValidation = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;

    if (!watchedAt) return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });

    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    const watchedValid = dateRegex.test(watchedAt);

    if (!watchedValid) {
        return res.status(400).send({
            message:
            'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    return next();
};

const rateValidation = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (rate === undefined) { 
        return res.status(400).send({ message: 'O campo "rate" é obrigatório' }); 
    }

    const rateValid = rate >= 1 && rate <= 5 && Number.isInteger(rate);
    if (!rateValid) {
        return res.status(400).send({
            message:
            'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }
    return next();
};

module.exports = {
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedValidation,
    rateValidation,
};