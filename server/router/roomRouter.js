const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/rooms', async (req, res) => {
    try {
        const { number, floor, pricePerNight, imageUrl, description, createdBy } = req.body;
        const room = new Room({ number, floor, pricePerNight, imageUrl, description});
        await room.save();
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/rooms/:id', async (req, res) => {
    try {
        const { number, floor, pricePerNight, imageUrl, description } = req.body;
        const room = await Room.findByIdAndUpdate(req.params.id, { number, floor, pricePerNight, imageUrl, description }, { new: true });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/rooms/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
