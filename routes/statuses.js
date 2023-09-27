const express = require('express');
const { createStatus, getStatusesByUserId, updateStatus, deleteStatus } = require('../data/statuses');
const validateReqBody = require('../middlewares/validation');
const { authentication } = require('../middlewares/authentication');
const { isSameUser } = require('../middlewares/isSameUser');
const { statusUpdateVS } = require('../lib/validationSchemas');

const router = express.Router();

router.post('/:petId',
    validateReqBody(statusUpdateVS),
    authentication,
    async (req, res) => {
        const userId = req.user.id
        const { petId } = req.params;
        const { status } = req.body;
        try {
            await createStatus(userId, petId, status);
            res.send('Pet status has changed successfully');
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/:userId',
    authentication,
    async (req, res) => {
        const { userId } = req.params;
        try {
            const ownedPets = await getStatusesByUserId(userId);
            res.send(ownedPets);
        }
        catch (err) {
            next(err);
        }
    }
);

router.put('/:petId',
    validateReqBody(statusUpdateVS),
    authentication,
    isSameUser,
    async (req, res) => {
        const userId = req.user.id
        const { petId } = req.params;
        const { status } = req.body;
        try {
            await updateStatus(userId, petId, status);
            res.send('Pet status has changed successfully');
        }
        catch (err) {
            next(err);
        }
    }
);

router.delete('/:petId',
    authentication,
    isSameUser,
    async (req, res) => {
        try {
            const userId = req.user.id
            const { petId } = req.params;
            await deleteStatus(userId, petId);
            res.send('Pet has returned successfully');
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;