const { getStatusByUserAndPetId } = require('../data/statuses');

const isSameUser = async (req, res, next) => {
    const userId = req.user.id;
    const { petId } = req.params;
    const result = await getStatusByUserAndPetId(userId, petId);
    if (!result.length) {
        res.status(403).send({ message: 'Only the pet owner can do that' });
        return;
    }
    next();
}
exports.isSameUser = isSameUser;