import { NavLink } from "react-router-dom";
import imagen1 from "../assets/img/sistema-real360.png";

export const Jumbotron = () => {
  return (
    <div className="container jumbotron">
      <div className="jumbotron-content">
        <h1 className="jumbotron-title"> Simplifica la gestión de tu edificio</h1>
        <p className="jumbotron-subtitle">Gestiona tus pagos, reportes, comunicados, votaciones y reservas desde una sola plataforma digital diseñada para administradores y residentes.</p>
        <NavLink to="/contact" className="btn btn-primary btn-lg">
          Solicita tu demo
        </NavLink>
      </div>
      <div className="jumbotron-image">
        <img src={imagen1} alt="Gestión edificios" />
      </div>
    </div>
  );
};