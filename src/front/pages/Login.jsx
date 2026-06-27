import { Link } from "react-router-dom";
import React from "react";
import loginFondo from "../assets/img/login-fondo-3.png";

export const Login = () => {
    return (
        <div className="row row-login">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center col-login-card">
                <div className="login-form">
                    <h2 className="mb-4 fw-bold">
                        Inicia Sesión
                    </h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4 small-links">
                            <Link to="/forgot-password" className="forgot-password-link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                            <Link to="/signup" className="forgot-password-link">
                                Regístrate
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Inicia Sesión</button>
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