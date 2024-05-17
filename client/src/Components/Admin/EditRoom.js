import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const EditHabitacion = () => {
  const { id } = useParams(); // Obtener el ID de la habitación desde la URL
  const navigate = useNavigate(); // Para redirigir después de guardar
  const [habitacion, setHabitacion] = useState({
    number: 0,
    floor: 0,
    pricePerNight: 0,
    imageUrl: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rooms/${id}`); // Obtener la habitación por ID
        setHabitacion(response.data); // Establecer los datos en el estado
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la habitación');
        setLoading(false);
      }
    };

    fetchHabitacion(); // Cargar la habitación al montar el componente
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Nombre y valor del input
    setHabitacion({ ...habitacion, [name]: value }); // Actualizar el estado de la habitación
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    try {
      await axios.put(`http://localhost:5000/rooms/update/${id}`, habitacion);
      navigate('/dashboard'); 
    } catch (error) {
      setError('Error al actualizar la habitación');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div  style={{
        marginTop: '150px',
        margin: '0 auto',
        justifyContent: 'center',
        textAlign: 'center', 
        maxWidth: '500px', // Limitar el ancho del formulario
        padding: '20px', // Espacio interno
        backgroundColor: '#f9f9f9', // Fondo claro para contraste
        borderRadius: '10px', // Bordes redondeados
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)' // Sombra sutil
      }}
    >
      <h2>Editar Habitación</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Número:</label>
          <input 
            type="number" 
            name="number" 
            value={habitacion.number} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Piso:</label>
          <input 
            type="number" 
            name="floor" 
            value={habitacion.floor} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Precio por Noche:</label>
          <input 
            type="number" 
            name="pricePerNight" 
            value={habitacion.pricePerNight} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>URL de la Imagen:</label>
          <input 
            type="text" 
            name="imageUrl" 
            value={habitacion.imageUrl} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Descripción:</label>
          <input 
            type="text" 
            name="description" 
            value={habitacion.description} 
            onChange={handleInputChange} 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Guardar Cambios
        </button>
        <button 
          type="button" 
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
          Atrás
        </button>
      </form>
    </div>
  );
};

export default EditHabitacion;
