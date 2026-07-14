import { NavLink } from "react-router-dom";
import "../css/Jumbotron.css";

export const Jumbotron = ({ title, subtitle, description, image, buttonText, buttonLink }) => {

  return (
    <div className="container jumbotron">
      <div className="jumbotron-content">
        {/*<span className="jumbotron-subtitle"> {subtitle}</span>*/}
        <h2 className="jumbotron-title"> {title}</h2>
        <div className="hero-blueline"></div>
        <p className="jumbotron-description">{description}</p>
        <NavLink to={buttonLink} className="btn btn-primary">
          {buttonText}
        </NavLink>
      </div>
      <div className="jumbotron-image">
        <img src={image} alt={title} />
      </div>
    </div>
  )
}