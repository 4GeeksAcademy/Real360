import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-custom">
			<div className="container">
				<Link className="navbar-brand fs-3 fw-bold" to="/">
					<i className="fa-regular fa-building me-2"> </i>&nbsp;
					REAL 360
				</Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
						<li className="nav-item"><Link className="nav-link" to="/"> Inicio </Link></li>
						<li className="nav-item"><Link className="nav-link" to="/about"> Nosotros </Link></li>
						<li className="nav-item"><Link className="nav-link" to="/services"> Servicios </Link></li>
						<li className="nav-item"><Link className="nav-link" to="/contact"> Contáctanos </Link></li>
						<li className="nav-item"><Link className="nav-link" to="/blog"> Blog </Link></li>
					</ul>

					<Link to="/login">
						<button className="btn btn-login">
							<i className="fa-brands fa-expeditedssl fa-lg"></i>&nbsp;
							Inicia sesión
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};