import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container container-login mt-5">
            <div className = "row g-4 p-3">
				<div className="col-lg-6 col-md-12 col-12">
                    <h1>Inicia Sesión</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                        <p className = "text-center mt-3">
                            ¿No tienes cuenta? { " "}
                            <Link to = "/signup">Regístrate</Link>
                        </p>
                    </form>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                    <h1>Portal Privado</h1>
                    <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </div>
            </div> 
        </div>
    );
};

export default Login;