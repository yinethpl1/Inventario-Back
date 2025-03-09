const { Router } = require('express');
const Producer = require('../models/Producer');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let producer = new Producer();
        producer.name = req.body.name;
        producer.state = req.body.state;
        producer.slogan = req.body.slogan;
        producer.description = req.body.description;

        producer = await producer.save();
        res.send(producer);

    } catch (error){
        console.log(error);
        res.status(500).send('message error');
    }

});

router.get('/', async function(req, res) {
    try {
        const producer = await Producer.find(); // select * from Producer;
        res.send(producer);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:id', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).send('Producer not found');
        }

        // Actualizar campos
        producer.name = req.body.name;
        producer.state = req.body.state;
        producer.slogan = req.body.slogan;
        producer.description = req.body.description;

        const updatedProducer = await producer.save();
        res.send(updatedProducer);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;