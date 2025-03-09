const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Media = require('../models/Media');

const router = Router();

// Validaciones para la creación y actualización de una media
const validateMedia = [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('title', 'invalid.title').not().isEmpty(),
    check('synopsis', 'invalid.synopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('photo', 'invalid.photo').not().isEmpty(),
    check('releaseYear', 'invalid.releaseYear').not().isEmpty(),
    check('mainGender', 'invalid.mainGender').isMongoId(),
    check('mainDirector', 'invalid.mainDirector').isMongoId(),
    check('producer', 'invalid.producer').isMongoId(),
    check('type', 'invalid.type').isMongoId(),
];

// Crear una nueva media
router.post('/', validateMedia, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { serial, title, synopsis, url, photo, releaseYear, mainGender, mainDirector, producer, type } = req.body;

        // Verificar si ya existe una media con el mismo serial
        const existMediaForSerial = await Media.findOne({ serial });
        if (existMediaForSerial) {
            return res.status(409).json({ message: 'Serial already exists' });
        }

        // Crear y guardar la nueva media
        const media = new Media({
            serial,
            title,
            synopsis,
            url,
            photo,
            releaseYear,
            mainGender,
            mainDirector,
            producer,
            type
        });

        await media.save();
        res.status(201).json(media);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Obtener todas las medias con información poblada
router.get('/', async (req, res) => {
    try {
        const media = await Media.find().populate([
            { path: 'mainGender', select: 'name' },
            { path: 'mainDirector', select: 'name' },
            { path: 'producer', select: 'name' },
            { path: 'type', select: 'name' }
        ]);
        res.json(media);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Actualizar una media existente
router.put('/:id', validateMedia, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        // Verificar si el serial ya existe en otro registro
        const existMediaForSerial = await Media.findOne({ serial: req.body.serial, _id: { $ne: req.params.id } });
        if (existMediaForSerial) {
            return res.status(409).json({ message: 'Serial already exists' });
        }

        // Actualizar campos
        media.serial = req.body.serial;
        media.title = req.body.title;
        media.synopsis = req.body.synopsis;
        media.url = req.body.url;
        media.photo = req.body.photo;
        media.releaseYear = req.body.releaseYear;
        media.mainGender = req.body.mainGender;
        media.mainDirector = req.body.mainDirector;
        media.producer = req.body.producer;
        media.type = req.body.type;

        const updatedMedia = await media.save();
        res.json(updatedMedia);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;