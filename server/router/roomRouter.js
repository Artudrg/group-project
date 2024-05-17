const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { number, floor, pricePerNight, imageUrl, description } = req.body;
        const room = new Room({ number, floor, pricePerNight, imageUrl, description});
        await room.save();
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una habitación por ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { number, floor, pricePerNight, imageUrl, description, reserved } = req.body;

        // Verificar si reserved está definido en el cuerpo de la solicitud
        const updatedFields = { number, floor, pricePerNight, imageUrl, description };
        if (reserved !== undefined) {
            updatedFields.reserved = reserved;
        }

        const room = await Room.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
