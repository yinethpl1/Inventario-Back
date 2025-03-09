const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    }
}, {
    timestamps: true // Añade automáticamente `createdAt` y `updatedAt`
});

module.exports = model('Type', TypeSchema);