const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: Number,
    floor: Number,
    pricePerNight: Number,
    imageUrl: String,
    description: String,
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Cambio de createdBy a reservedBy
});

module.exports = mongoose.model('Room', roomSchema);