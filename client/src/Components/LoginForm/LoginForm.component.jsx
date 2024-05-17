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
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Login</h1>
                    <div>
                        {errors.email && <small>{errors.email}</small>}
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleChange}
                            placeholder="Correo"
                            required={true}
                        />
                    </div>
                    <div>
                        {errors.password && <small>{errors.password}</small>}
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password || ""}
                            onChange={handleChange}
                            required={true}
                            placeholder="Contraseña"
                            minLength={5}
                        />
                    </div>
                    <div className="btn">
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <Link to={`/register`}>¿No tienes cuenta? Regístrate</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
