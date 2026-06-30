
import { useState } from "react"
import useGloalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";


import loginFondo from "../assets/img/login-fondo-3.png";
import "../css/Login.css"

export const Login = () => {
    const { dispatch } = useGloalReducer();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const login = async () => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        const response = await fetch(backendUrl + "/api/login", fetchOptions);
        const data = await response.json();
        console.log(data.access_token, data.user);

        localStorage.setItem("token", data.access_token);

        dispatch({
            type: "set_user",
            payload: data.user,
        });

        if (response.ok) {
            navigate("/dashboard");
        }
    }

    return (
        <div className="row row-login">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center col-login-card">
                <div className="login-form">
                    <h2 className="mb-4 fw-bold">
                        Inicia Sesión
                    </h2>
                    <form >
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                            <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4 small-links">
                            <Link to="/forgot-password" className="forgot-password-link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                            <Link to="/signup" className="forgot-password-link">
                                Regístrate
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); login(); }}> Inicia Sesión</button>
                    </form>
                </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex flex-column col-login-img" style={{ backgroundImage: `url(${loginFondo})` }}>
                <div className="login-overlay-text">
                    <h2 className="login-title">
                        Portal Privado
                    </h2>
                    <p className="login-description">
                        Al ingresar sus credenciales accederá al sistema de administración de su edificio.
                        Acceso exclusivo para usuarios autorizados.
                    </p>
                </div>
            </div>
        </div>
    );
};