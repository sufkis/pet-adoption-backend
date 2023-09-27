const express = require('express');
const { createHearty, deleteHearty, getHeartiesByUserId, getHearty } = require('../data/hearties');
const { authentication } = require('../middlewares/authentication');

const router = express.Router();

router.post('/:petId',
    authentication,
    async (req, res) => {
        const userId = req.user.id
        const { petId } = req.params;
        try {
            await createHearty(userId, petId);
            res.send('Pet has been added to your hearty list');
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/:petId',
    authentication,
    async (req, res) => {
        const userId = req.user.id
        const { petId } = req.params;
        try {
            const hearty = await getHearty(userId, petId);
            res.send(hearty);
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/all/:userId',
    authentication,
    async (req, res) => {
        const { userId } = req.params;
        try {
            const heartedPets = await getHeartiesByUserId(userId);
            res.send(heartedPets);
        }
        catch (err) {
            next(err);
        }
    }
);

router.delete('/:petId',
    authentication,
    async (req, res) => {
        try {
            const userId = req.user.id
            const { petId } = req.params;
            await deleteHearty(userId, petId);
            res.send('Pet has been removed from your hearty list');
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;