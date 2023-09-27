const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { createUser, getUserByEmail, updateUser, updateUserPassword, getAllUser, getUserPasswordById, getUserById } = require('../data/users');
const validateReqBody = require('../middlewares/validation');
const { userInfoSignUpVS,
    userInfoUpdateVS,
    loginReqVS,
    passwordChangeVS } = require('../lib/validationSchemas');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const { getStatusesByUserId } = require('../data/statuses');

const router = express.Router();

router.post('/',
    validateReqBody(userInfoSignUpVS),
    async (req, res, next) => {
        const { email, password, firstName, lastName, phone } = req.body;
        const bio = '';
        const userId = uuidv4();
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) next(err);
            else {
                try {
                    const user = await getUserByEmail(email);
                    if (user) {
                        res.status(403).send({ message: 'Email is already in use. Please provide a different email.' });
                        return;
                    }
                    await createUser(userId, email, hash, firstName, lastName, phone);
                    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET)
                    res.send({
                        token,
                        user: {
                            id: userId, email, firstName, lastName, phone, bio
                        }
                    });
                } catch (err) {
                    next(err);
                }
            }
        })
    }
);

router.post('/login',
    validateReqBody(loginReqVS),
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(401).send({ message: 'Email or Password is incorrect. Please try again.' });
            return;
        }
        const { user_id, first_name, last_name, phone, bio, role } = user;
        bcrypt.compare(password, user.password_hash, (err, result) => {
            if (err) next(err);
            else {
                if (result) {
                    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET)
                    res.send({
                        token,
                        user: {
                            id: user_id,
                            email: user.email,
                            firstName: first_name,
                            lastName: last_name,
                            phone,
                            bio,
                            role
                        }
                    });
                }
                else {
                    res.status(401).send({ message: 'Email or Password is incorrect. Please try again.' });
                }
            }
        });
    }
);

router.put('/',
    validateReqBody(userInfoUpdateVS),
    authentication,
    async (req, res, next) => {
        const { email, firstName, lastName, phone, bio } = req.body;
        const user = await getUserByEmail(email);
        if (user && user.user_id !== req.user.id) {
            res.status(403).send({ message: 'This email is already being used. Please provide a different email.' });
            return;
        }
        try {
            await updateUser(req.user.id, email, firstName, lastName, phone, bio);
            res.send({
                user: {
                    id: req.user.id,
                    email,
                    firstName,
                    lastName,
                    phone,
                    bio
                }
            });
        }
        catch (err) {
            next(err);
        }
    }
);

router.put('/:userId',
    validateReqBody(passwordChangeVS),
    authentication,
    async (req, res, next) => {
        const { currentPassword, newPassword } = req.body;
        const { userId } = req.params;
        const user = await getUserPasswordById(userId);
        bcrypt.compare(currentPassword, user.password_hash, (err, result) => {
            if (err) next(err);
            else {
                if (result) {
                    bcrypt.hash(newPassword, 10, async (err, hash) => {
                        if (err) next(err);
                        else {
                            try {
                                updateUserPassword(userId, hash);
                                res.send({ message: 'Password has changed successfully!' });
                            }
                            catch (err) {
                                next(err);
                            }
                        }
                    });
                }
                else {
                    res.status(401).send({ message: 'Incorrect password. Please try again.' });
                }
            }
        });
    }
);

router.get('/', authentication, authorization, async (req, res) => {
    try {
        const userList = await getAllUser();
        res.send(userList);
    }
    catch (err) {
        next(err);
    }
});

router.get('/:userId', authentication, async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        res.send(user);
    }
    catch (err) {
        next(err);
    }
});

router.get('/:userId/full',
    authentication,
    authorization,
    async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await getUserById(userId);
            const ownedPets = await getStatusesByUserId(userId);
            res.send({ user, ownedPets })
        }
        catch (err) {
            next(err);
        }
    }
)

module.exports = router;