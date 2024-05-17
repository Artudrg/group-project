import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoomNew = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    number: '',
    floor: '',
    pricePerNight: '',
    imageUrl: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/rooms/add', room); 
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al agregar la habitación:', error);
    }
  };

  return (
    <div 
      style={{
        marginTop: '150px',
        margin: '0 auto', 
        justifyContent: 'center',
        textAlign: 'center', 
        maxWidth: '500px', 
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px', 
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>Agregar Nueva Habitación</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Número de Habitación:</label>
          <input 
            type="text" 
            name="number" 
            value={room.number} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Piso:</label>
          <input 
            type="text" 
            name="floor" 
            value={room.floor} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Precio por Noche:</label>
          <input 
            type='number' 
            name='pricePerNight' 
            value={room.pricePerNight} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>URL de la Imagen:</label>
          <input 
            type='text' 
            name='imageUrl' 
            value={room.imageUrl} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Descripción:</label>
          <input 
            type='text' 
            name='description' 
            value={room.description} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <button 
          type='submit' 
          style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Guardar
        </button>
        <button 
          type='button' 
          style={{ 
            backgroundColor: 'red', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer', 
            marginLeft: '20px' 
          }}
          onClick={() => navigate('/dashboard')}
        >
          Atras
        </button>
      </form>
    </div>
  );
};

export default RoomNew;
