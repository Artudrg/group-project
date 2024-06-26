import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const location = useLocation();
    const userRole = location.state ? location.state.role : "";

    useEffect(() => {
        const fetchHabitaciones = async () => {
            try {
                const response = await axios.get("http://localhost:5000/rooms");
                setHabitaciones(response.data);
            } catch (error) {
                console.error("Error al obtener las habitaciones:", error);
            }
        };

        fetchHabitaciones();
    }, []);

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
                        marginright={"20px"}
                    ></img>
                    <h1>King Hotel</h1>
                </div>
                <div style={{ marginTop: "25px", textDecoration: "none" }}>
                    <Link
                        to="/"
                        style={{
                            marginRight: "10px",
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        Salir
                    </Link>
                    {userRole === "admin" && (
                        <Link
                            to="/dashboard"
                            style={{
                                marginRight: "10px",
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </nav>

            <h2 style={{ textAlign: "center", margin: "20px 0", marginTop: "25px" }}>
                Todas las habitaciones
            </h2>

            <div
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            >
                {habitaciones.map((habitacion) => (
                    <div
                        key={habitacion._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            margin: "10px",
                            width: "40%",
                        }}
                    >
                        <img
                            src={habitacion.imageUrl}
                            alt={habitacion.description}
                            style={{ width: "750px", maxHeight: "340px" }}
                        />
                        <h3>Habitación {habitacion.number}</h3>
                        <p>{habitacion.description}</p>
                        <span
                            style={{
                                fontSize: "1.2em", // Tamaño de fuente más grande para el precio
                                fontWeight: "bold",
                                marginBottom: "20px",
                                color: "#222", // Color de texto oscuro para resaltar el precio
                            }}
                        >
                            Precio por noche:{" "}
                        </span>
                        <span>
                            {habitacion.pricePerNight !== undefined ? `$${habitacion.pricePerNight.toFixed(2)}` : 'No disponible'}
                        </span>
                        <br></br>
                        <button
                            style={{
                                textDecoration: "none",
                                backgroundColor: "#007bff",
                                border: "none",
                                padding: "10px 20px",
                                textAlign: "center",
                                fontSize: "16px",
                                cursor: "pointer",
                                borderRadius: "5px",
                            }}
                        >
                            <Link
                                to={`/room/${habitacion._id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                Ver habitación
                            </Link>{" "}
                            {/* Enlace a la página de la habitación */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habitaciones;
