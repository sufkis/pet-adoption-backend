const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'Must provide an authorization header' });
        return;
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Non-valid token' });
            return;
        }
        req.user = decoded;
        next();
    });
}
exports.authentication = authentication;