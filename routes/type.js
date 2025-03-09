const { Router } = require('express');
const Type = require('../models/Type');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let type = new Type();
        type.name = req.body.name;
        type.description = req.body.description;

        type = await type.save();
        res.send(type);

    } catch (error){
        console.log(error);
        res.status(500).send('message error');
    }

});

router.get('/', async function(req, res) {
    try {
        const type = await Type.find(); // select * from Type;
        res.send(type);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:id', [
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).send('Type not found');
        }

        // Actualizar campos
        type.name = req.body.name;
        type.description = req.body.description;

        const updatedType = await type.save();
        res.send(updatedType);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;