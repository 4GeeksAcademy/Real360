import { NavLink } from "react-router-dom";
import "../css/Services.css";

export const ServicesIntro = () => {
    return (
        <div className="container intro">
            <div className="intro-content">
                <h1 className="intro-title">
                    Administración de Edificios
                </h1>

                <p className="intro-description">
                    Brindamos un servicio integral de administración de edificios enfocado en una gestión eficiente, transparente y ordenada. Nuestro objetivo es asegurar el correcto funcionamiento del edificio, optimizar sus recursos y brindar tranquilidad a propietarios y residentes. A continuación, te presentamos los servicios que ofrecemos:
                </p>

                <NavLink to="/contact" className="btn btn-primary btn-lg" >
                    Solicita tu servicio
                </NavLink>

            </div>
        </div>
    );
};