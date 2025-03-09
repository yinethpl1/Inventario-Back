const { Schema, model } = require('mongoose');

const GenderSchema = Schema({
    name: { 
        type: String, 
        required:true 
    },
    state: { 
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

module.exports = model('Gender', GenderSchema);