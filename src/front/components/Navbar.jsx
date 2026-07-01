import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../assets/img/logo-real360.png";

export const Navbar = () => {
	const getNavClass = ({ isActive }) => isActive ? "nav-link active-link" : "nav-link";

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				<NavLink className="navbar-brand d-flex align-items-center" to="/">
					<img src={logo} alt="REAL 360" height="30" />
				</NavLink>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
						<li className="nav-item">
							<NavLink to="/" className={getNavClass}>Inicio</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/about" className={getNavClass}>Nosotros</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/services" className={getNavClass}>Servicios</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/contact" className={getNavClass}>Contáctanos</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/blog" className={getNavClass}>Blog</NavLink>
						</li>
					</ul>
					<NavLink to="/login" className="btn btn-login">
						<i className="fa-brands fa-expeditedssl"></i>
						<span>Inicia sesión</span>
					</NavLink>
				</div>
			</div>
		</nav>
	);
};