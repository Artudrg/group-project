import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/main.css'

const Dashboard = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabitaciones = async () => {
            try {
                const response = await axios.get("http://localhost:5000/rooms"); // Ruta para obtener todas las habitaciones
                setHabitaciones(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error al cargar las habitaciones");
                setLoading(false);
            }
        };

        fetchHabitaciones(); // Llamar a la función para obtener las habitaciones
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/rooms/${id}`); // Eliminar la habitación por ID
            setHabitaciones(
                habitaciones.filter((habitacion) => habitacion._id !== id)
            ); // Actualizar el estado
        } catch (error) {
            console.error("Error al eliminar la habitación:", error);
        }
    };
    const handleRelease = async (id) => {
        try {
            await axios.put(`http://localhost:8000/habitaciones/release/${id}`); // Ruta para liberar la habitación
            setHabitaciones(habitaciones.map(habitacion => {
                if (habitacion._id === id) {
                    return { ...habitacion, reservedBy: null }; // Cambiar reservedBy a null
                }
                return habitacion;
            }));
        } catch (error) {
            console.error('Error al liberar la habitación:', error);
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
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <div style={{ display: "flex" }}>
                    <img
                        src="https://graphicdesigneye.com/images/hotel-logo-design-service.png"
                        alt="Logo"
                        width={"70px"}
                        marginRight ={"20px"}
                    ></img>
                    <h1>King Hotel</h1>
                </div>
                <div style={{ marginTop: "25px", textDecoration: "none" }}>
                    <Link
                        to="/rooms"
                        style={{
                            marginRight: "10px",
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        Inicio
                    </Link>
                </div>
            </nav>

            <div style={{ display: "flex" }}>
                <h2
                    style={{ textAlign: "center", margin: "20px 0", marginTop: "25px" }}
                >
                    Panel de Administración
                </h2>
                <button
                    style={{
                        maxHeight: "30px",
                        marginTop: "30px",
                        marginLeft: "30px",
                        backgroundColor: "gold",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <Link to="/new" style={{ textDecoration: "none", color: "black" }}>
                        Agregar Habitación
                    </Link>
                </button>
            </div>

            <table className="table-container">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Piso</th>
                        <th>Precio por Noche</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {habitaciones.map((habitacion) => (
                        <tr key={habitacion._id}>
                            <td>{habitacion.number}</td>
                            <td>{habitacion.floor}</td>
                            <td>${habitacion.pricePerNight.toFixed(2)}</td>
                            <td>{habitacion.description}</td>
                            <td>
                                <Link to={`/edit/${habitacion._id}`}>
                                    <button
                                        style={{
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            padding: "5px 10px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Editar
                                    </button>
                                </Link>
                                <button
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        padding: "5px 10px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                    }}
                                    onClick={() => handleDelete(habitacion._id)}
                                >
                                    Eliminar
                                </button>
                                {habitacion.reservedBy && ( // Mostrar botón solo si reservedBy no es null
                                    <button
                                        style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                                        onClick={() => handleRelease(habitacion._id)}
                                    >
                                        Liberar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
