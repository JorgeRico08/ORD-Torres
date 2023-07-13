const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    respuestas: [{ type: Number, min: 1, max: 4 }],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
