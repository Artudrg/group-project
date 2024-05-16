import React, { useState } from 'react';
import axios from 'axios';

function CreateRoomForm() {
    const [formData, setFormData] = useState({
        number: '',
        floor: '',
        pricePerNight: '',
        imageUrl: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/rooms', formData)
            .then(response => {
                console.log('Room created successfully:', response.data);
                // Redirigir al dashboard del administrador u otra página después de la creación
            })
            .catch(error => {
                console.error('Error creating room:', error);
            });
    };

    return (
        <div>
            <h2>Create Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Number:</label>
                    <input type="text" name="number" value={formData.number} onChange={handleChange} />
                </div>
                <div>
                    <label>Floor:</label>
                    <input type="text" name="floor" value={formData.floor} onChange={handleChange} />
                </div>
                <div>
                    <label>Price per Night:</label>
                    <input type="text" name="pricePerNight" value={formData.pricePerNight} onChange={handleChange} />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateRoomForm;
