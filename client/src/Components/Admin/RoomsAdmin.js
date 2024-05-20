import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/main.css";

const Dashboard = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabitaciones = async () => {
            try {
                const response = await axios.get("http://localhost:5000/rooms");
                setHabitaciones(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error al cargar las habitaciones");
                setLoading(false);
            }
        };

        fetchHabitaciones();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/rooms/delete/${id}`);
            setHabitaciones((prevHabitaciones) =>
                prevHabitaciones.filter((habitacion) => habitacion._id !== id)
            );
        } catch (error) {
            console.error("Error al eliminar la habitación:", error);
        }
    };

    const handleRelease = async (id) => {
        try {
            const updatedHabitacion = {
                reserved: null,
            };
            await axios.put(
                `http://localhost:5000/rooms/update/${id}`,
                updatedHabitacion
            );
            setHabitaciones((prevHabitaciones) =>
                prevHabitaciones.map((habitacion) => {
                    if (habitacion._id === id) {
                        return { ...habitacion, reserved: null };
                    }
                    return habitacion;
                })
            );
        } catch (error) {
            console.error("Error al liberar la habitación:", error);
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
                        marginRight={"20px"}
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
                        <th>Fecha de Entrada</th>
                        <th>Fecha de Salida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {habitaciones.map((habitacion) => (
                        <tr key={habitacion._id}>
                            <td>{habitacion.number}</td>
                            <td>{habitacion.floor}</td>
                            <td>
                                {habitacion.pricePerNight !== undefined
                                    ? `$${habitacion.pricePerNight.toFixed(2)}`
                                    : "No disponible"}
                            </td>
                            <td>{habitacion.description}</td>
                            <td>
                                {habitacion.reserved
                                    ? new Date(habitacion.checkIn).toLocaleDateString('es-ES')
                                    : "No reservado"}
                            </td>
                            <td>
                                {habitacion.reserved
                                    ? new Date(habitacion.checkOut).toLocaleDateString('es-ES')
                                    : "No reservado"}
                            </td>
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
                                {habitacion.reserved && (
                                    <button
                                        style={{
                                            backgroundColor: "#28a745",
                                            color: "white",
                                            padding: "5px 10px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginLeft: "10px",
                                        }}
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
