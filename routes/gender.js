const { Router } = require('express');
const Gender = require('../models/Gender');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let gender = new Gender();
        gender.name = req.body.name;
        gender.state = req.body.state;
        gender.description = req.body.description;

        gender = await gender.save();
        res.send(gender);

    } catch (error){
        console.log(error);
        res.status(500).send('message error');
    }

});

router.get('/', async function(req, res) {
    try {
        const gender = await Gender.find(); // select * from Gender;
        res.send(gender);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:id', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const gender = await Gender.findById(req.params.id);
        if (!gender) {
            return res.status(404).send('Gender not found');
        }

        gender.name = req.body.name;
        gender.state = req.body.state;
        gender.description = req.body.description;

        const updatedGender = await gender.save();
        res.send(updatedGender);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;