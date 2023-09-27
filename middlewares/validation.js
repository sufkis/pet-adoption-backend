const Ajv = require('ajv').default;

const ajv = new Ajv();

const validateReqBody = (schema) => {
    const validateNewUser = ajv.compile(schema);
    return (req, res, next) => {
        const valid = validateNewUser(req.body);
        if (!valid) res.status(400).send({ errors: validateNewUser.errors })
        else next();
    }
}

module.exports = validateReqBody;