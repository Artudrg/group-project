import { useState } from "react";
import HTTPClient from '../../Utils/HTPPClient';
import { useNavigate, Link } from "react-router-dom";
import '../styles/Register.css';

const RegisterForm = (props) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
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

        if (data.password && data.password2 && data.password !== data.password2) {
            errors.password = "Las contraseñas no son iguales";
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

        client.register(data)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(error.response.data.errors);
                }
                console.log(error);
            });
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Crea tu cuenta</h1>
                <div className="input-container">
                    {errors.name && <small className="error-message">{errors.name}</small>}
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name || ""}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required={true}
                        className="input-field"
                    />
                </div>
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
                        placeholder="Contraseña"
                        required={true}
                        minLength={5}
                        className="input-field"
                    />
                </div>
                <div className="input-container">
                    {errors.password && <small className="error-message">{errors.password}</small>}
                    <input
                        id="password2"
                        type="password"
                        name="password2"
                        value={data.password2 || ""}
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        required={true}
                        minLength={5}
                        className="input-field"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="role">Rol:</label>
                    <select
                        id="role"
                        name="role"
                        value={data.role || ""}
                        onChange={handleChange}
                        required={true}
                        className="input-field"
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div className="btn-container">
                    <button type="submit" className="submit-btn">Crear Cuenta</button>
                </div>
                <div className="login-link">
                    <Link to="/">¿Ya tienes cuenta? Loguéate</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
