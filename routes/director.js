const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        const director = new Director();
        director.name = req.body.name;
        director.state = req.body.state;

        const savedDirector = await director.save();
        res.send(savedDirector);

    } catch (error){
        console.log(error);
        res.status(500).send('message error');
    }

});

router.get('/', async function(req, res) {
    try {
        const director = await Director.find(); // select * from director;
        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:id', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).send('Director no encontrado');
        }

        director.name = req.body.name;
        director.state = req.body.state;

        const updatedDirector = await director.save();
        res.send(updatedDirector);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;