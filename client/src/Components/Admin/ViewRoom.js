import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewRoom = () => {
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rooms/${id}`);
        setHabitacion(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la habitación');
        setLoading(false);
      }
    };

    fetchHabitacion();
  }, [id]);

  const handleReservation = async () => {
    if (!checkIn || !checkOut) {
      setDateError('Por favor, introduce fechas de entrada y salida.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setDateError('La fecha de salida no puede ser anterior o igual a la fecha de entrada.');
      return;
    }

    try {
      const updatedHabitacion = {
        reserved: true,
        checkIn,
        checkOut
      };

      const response = await axios.put(`http://localhost:5000/rooms/update/${id}`, updatedHabitacion);
      setHabitacion(response.data);
      setDateError(null); // Clear date error if reservation is successful
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
        <div style={{ display: 'flex' }}>
          <img src='https://graphicdesigneye.com/images/hotel-logo-design-service.png' alt='Logo' width={'70px'} />
          <h1>King Hotel</h1>
        </div>
        <div style={{ marginTop: '25px', textDecoration: 'none' }}>
          <Link to="/rooms" style={{ marginRight: '10px', textDecoration: 'none', color: 'black' }}>Inicio</Link>
        </div>
      </nav>
      <div style={{ display: 'flex', padding: '20px', justifyContent: 'center', height: '100vh' }}>
        <div style={{ flex: 1 }}>
          <img src={habitacion.imageUrl} alt={habitacion.description} style={{ width: '100%', borderRadius: '10px' }} />
        </div>
        <div style={{
          flex: 2,
          border: '1px solid #e0e0e0',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '400px',
          maxHeight: '450px',
          margin: '0 auto'
        }}>
          <h2>Habitación {habitacion.number}</h2>
          <p>{habitacion.description}</p>
          <p>Piso: {habitacion.floor}</p>
          <p>Precio por Noche: ${habitacion.pricePerNight.toFixed(2)}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <p>Fecha de Entrada</p>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="Fecha de Entrada"
              style={{ width: '150px', padding: '2px', marginBottom: '5px' }}
            />
            <p>Fecha de Salida</p>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="Fecha de Salida"
              style={{ width: '150px', padding: '2px', marginBottom: '5px' }}
            />
            {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
          </div>
          <button style={{
            textDecoration: 'none',
            backgroundColor: habitacion.reserved ? 'red' : '#007bff',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            color: 'white'
          }}
            onClick={handleReservation}
            disabled={habitacion.reserved}
          >
            {habitacion.reserved ? 'Reservado' : 'Reservar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;
