import { Link } from "react-router-dom";
import React from "react";
import Card from "../components/Card";

const Login = () => {
    return ( 
        <div className="container container-login">
            <div className = "row">
				<div className="col-lg-6 d-flex justify-content-center align-items-center col-login-card">
                    <div className="card login-card p-3">
                        <h3>Inicia Sesión</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">Nunca compartiremos tu contraseña con nadie.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-primary">Inicia Sesión</button>
                            <p className = "text-center mt-3">
                                ¿No tienes cuenta? { " "}
                                <Link to = "/signup">Regístrate</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center col-login-imagen">
                    <div className="card login-imagen p-3">
                        <div className="card-body">
                            <h3 className="card-title">Portal Privado</h3>
                            <p className="card-text">Al ingresar tus credenciales estarás accediendo al portal de gestión de tu edificio. Acceso solo para personal autorizado!</p>
                        </div>
                        <img src="https://images.pexels.com/photos/4973899/pexels-photo-4973899.jpeg" class="card-img-top" />
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Login;