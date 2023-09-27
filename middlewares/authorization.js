const { getUserPasswordById } = require('../data/users');

const authorization = async (req, res, next) => {
    const userId = req.user.id;
    const user = await getUserPasswordById(userId);
    const isAdmin = user.role === 'admin';
    if (!isAdmin) {
        res.status(403).send({ message: 'Only an admin can do that' });
        return;
    }
    next();
}
exports.authorization = authorization;