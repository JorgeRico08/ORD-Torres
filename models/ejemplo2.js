// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  answers: [
    {
      question: { type: String, required: true },
      answer: { type: Number, min: 1, max: 4 },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
