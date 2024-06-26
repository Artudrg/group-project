import React, { useState } from "react";
import HTTPClient from '../../Utils/HTPPClient';
import { useNavigate, Link } from "react-router-dom";
import '../styles/Login.css';

const LoginForm = () => {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const validate = () => {
        let flag = true;
        let errors = {};

        if (data.password.length <= 5) {
            errors.password = "La contraseña no puede tener menos de 5 caracteres";
            flag = false;
        }
        setErrors(errors);
        return flag;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        let client = new HTTPClient();

        client.login(data.email, data.password)
            .then((response) => {
                const role = response.data.user.role;
                if (role === "admin") {
                    navigate("/rooms", { state: { role } });
                } else {
                    navigate("/rooms");
                }
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(error.response.data.errors);
                }
                console.log(error);
            });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Iniciar Sesión</h1>
                <div className="input-container">
                    {errors.email && <small className="error-message">{errors.email}</small>}
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email || ""}
                        onChange={handleChange}
                        placeholder="Correo"
                        required={true}
                        className="input-field"
                    />
                </div>
                <div className="input-container">
                    {errors.password && <small className="error-message">{errors.password}</small>}
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password || ""}
                        onChange={handleChange}
                        required={true}
                        placeholder="Contraseña"
                        minLength={5}
                        className="input-field"
                    />
                </div>
                <div className="btn-container">
                    <button type="submit" className="submit-btn">Login</button>
                </div>
                <div className="register-link">
                    <Link to="/register">¿No tienes cuenta? Regístrate</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
