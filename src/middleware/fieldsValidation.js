const emailValidation = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ message: 'O campo "email" é obrigatório' });
    }

    const emailValid = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);

    if (emailValid) return next();
    return res
        .status(400)
        .send({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const passwordValidation = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res
            .status(400)
            .send({ message: 'O campo "password" é obrigatório' });
    }

    const passwordValid = password.length >= 6;

    if (passwordValid) return next();

    return res
        .status(400)
        .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = {
    emailValidation,
    passwordValidation,
};