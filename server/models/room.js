const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: Number,
    floor: Number,
    pricePerNight: Number,
    imageUrl: String,
    description: String,
    reserved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Room', roomSchema);
