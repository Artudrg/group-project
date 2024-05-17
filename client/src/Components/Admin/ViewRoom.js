import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewRoom = () => {
  const { id } = useParams();
  const [habitaciones, setHabitaciones] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rooms/${id}`);
        setHabitaciones(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la habitación');
        setLoading(false);
      }
    };

    fetchHabitacion();
  }, [id]);

  const handleReservation = async () => {
    try {
        const updatedHabitacion = {
            reserved: true // Establecer el estado de reserva como true
        };

        const response = await axios.put(`http://localhost:5000/rooms/update/${id}`, updatedHabitacion);
        setHabitaciones(response.data);

        // Mostrar un mensaje en la consola indicando que la habitación ha sido reservada
        console.log('La habitación ha sido reservada.');
    } catch (error) {
        console.error('Error al reservar la habitación:', error);
    }
};

  

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <div style={{ display: 'flex'}}>
          <img src='https://graphicdesigneye.com/images/hotel-logo-design-service.png' alt='Logo' width={'70px'}></img>
          <h1>King Hotel</h1>
        </div>
        <div style={{marginTop: '25px', textDecoration: 'none'}}>
          <Link to="/rooms" style={{ marginright: '10px', textDecoration: 'none', color: 'black'}}>Inicio</Link>
        </div>
      </nav>
      <div style={{ 
        display: 'flex', 
        padding: '20px', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        {/* Imagen de la habitación */}
        <div style={{ flex: 1 }}>
          <img src={habitaciones.imageUrl} alt={habitaciones.description} style={{ width: '100%', borderRadius: '10px' }} />
        </div>

        {/* Información de la habitación */}
        <div style={{ 
          flex: 2, 
          border: '1px solid #e0e0e0', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-around',
          maxWidth: '400px',
          maxHeight: '400px'
        }}>
          <h2>Habitación {habitaciones.number}</h2>
          <p>{habitaciones.description}</p>
          <p>Piso: {habitaciones.floor}</p>
          <p>Precio por Noche: ${habitaciones.pricePerNight.toFixed(2)}</p>
          <button style={{ 
            textDecoration: 'none',                    
            backgroundColor: habitaciones.reserved ? 'red' : '#007bff',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            color: 'white'
          }}
          onClick={handleReservation}
          disabled={habitaciones.reserved} 
          >
            {habitaciones.reserved ? 'Reservado' : 'Reservar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;
