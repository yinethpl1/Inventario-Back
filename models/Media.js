const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: { 
        type: String, 
        required:true,
        unique: true 
    },
    title: { 
        type: String, 
        required:true
    },
    synopsis: { 
        type: String, 
        required: true
    },
    url: { 
        type: String, 
        required:true,
        unique: true 
    },
    photo: { 
        type: String,
    },
    releaseYear: { 
        type: Number, 
        required:true
    },
    mainGender: { 
        type: Schema.Types.ObjectId, 
        ref: 'Gender', // Referencia al modelo Genre
        required: true
    },
    mainDirector: { 
        type: Schema.Types.ObjectId, 
        ref: 'Director', // Referencia al modelo Director
        required: true
    },
    producer: { 
        type: Schema.Types.ObjectId, 
        ref: 'Producer', // Referencia al modelo Producer
        required:true
    },
    type: { 
        type: Schema.Types.ObjectId, 
        ref: 'Type', // Referencia al modelo Type
        required: true
    }
}, {
    timestamps: true // Añade automáticamente `createdAt` y `updatedAt`
});

module.exports = model('Media', MediaSchema);