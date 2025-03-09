const { Schema, model } = require('mongoose');

const ProducerSchema = Schema({
    name: { 
        type: String, 
        required:true
    },
    state: { 
        type: String, 
        required: true
    },
    slogan: { 
        type: String, 
        required:true
    },
    description: { 
        type: String, 
        required:true
    }
}, {
    timestamps: true // Añade automáticamente `createdAt` y `updatedAt`
});

module.exports = model('Producer', ProducerSchema);