import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomList from './RoomList';
import CreateRoomForm from './CreateRoomForm';

function AdminDashboard() {
    const [rooms, setRooms] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = () => {
        axios.get('/api/rooms')
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
            });
    };

    const handleCreateClick = () => {
        setShowCreateForm(true);
    };

    const handleEditClick = (roomId) => {
        // Lógica para redirigir a la página de edición de habitación con el ID de la habitación
    };

    const handleReleaseClick = (roomId) => {
        // Lógica para liberar la habitación
    };

    const handleDeleteClick = (roomId) => {
        // Lógica para borrar la habitación
        axios.delete(`/api/rooms/${roomId}`)
            .then(response => {
                console.log('Room deleted successfully:', response.data);
                fetchRooms(); // Actualizar la lista de habitaciones después de eliminar una habitación
            })
            .catch(error => {
                console.error('Error deleting room:', error);
            });
    };

    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
        fetchRooms(); // Actualizar la lista de habitaciones después de crear una nueva
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleCreateClick}>Create Room</button>
            {showCreateForm && <CreateRoomForm onClose={handleCloseCreateForm} />}
            <RoomList rooms={rooms} onEdit={handleEditClick} onRelease={handleReleaseClick} onDelete={handleDeleteClick} />
        </div>
    );
}

export default AdminDashboard;
