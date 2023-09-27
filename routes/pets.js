const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { getPetsBySearch, createPet, updatePet, updatePetStatus, getAllPets, getPetById, getPetsByType, updatePetImageById } = require('../data/pets');
const validateReqBody = require('../middlewares/validation');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const { petInfoUpdateVS, statusUpdateVS } = require('../lib/validationSchemas');
const { upload } = require('../middlewares/imageUpload');
const { uploadToCloudinary } = require('../lib/cloudinary');

const router = express.Router();

router.post('/',
    validateReqBody(petInfoUpdateVS),
    authentication,
    authorization,
    async (req, res, next) => {
        const petId = uuidv4();
        const { name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, imageUrl } = req.body;
        try {
            await createPet(petId, name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, imageUrl);
            res.send({ message: 'Pet added successfully!' });
        }
        catch (err) {
            next(err);
        }
    }
);

router.post('/image',
    authentication,
    authorization,
    upload.single('image'),
    async (req, res, next) => {
        try {
            const result = await uploadToCloudinary(req.file.path) 
            fs.unlinkSync(req.file.path);
            res.send({ imageUrl: result.secure_url });
        }
        catch (err) {
            next(err);
        }
    }
);

router.put('/:petId',
    validateReqBody(petInfoUpdateVS),
    authentication,
    authorization,
    async (req, res, next) => {
        const petId = req.params.petId;
        const { name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, imageUrl } = req.body;
        try {
            await updatePet(petId, name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, imageUrl);
            res.send({ message: 'Pet updated successfully!' });
        }
        catch (err) {
            next(err);
        }
    }
);

router.put('/status/:petId',
    validateReqBody(statusUpdateVS),
    authentication,
    async (req, res, next) => {
        const { petId } = req.params;
        const { status } = req.body;
        try {
            updatePetStatus(petId, status);
            res.send({ status })
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/',
    authentication,
    async (req, res) => {
        try {
            const petsList = await getAllPets();
            res.send(petsList);
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/search',
    async (req, res) => {
        try {
            const pets = await getPetsBySearch(req.query);
            res.send(pets);
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/type/:type',
    async (req, res) => {
        try {
            const { type } = req.params;
            const pets = await getPetsByType(type);
            res.send(pets);
        }
        catch (err) {
            next(err);
        }
    }
);

router.get('/:petId',
    async (req, res) => {
        try {
            const petId = req.params.petId;
            const pet = await getPetById(petId);
            res.send(pet);
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;