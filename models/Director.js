const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
    name: { 
        type: String, 
        required:true
    },
    state: { 
        type: String, 
        required: true
    }
}, {
    timestamps: true // Esto automáticamente añade `createdAt` y `updatedAt`
});

module.exports = model('Director', DirectorSchema);