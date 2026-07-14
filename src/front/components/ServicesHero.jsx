import React from "react";
import { Card } from "./Card";
import { NavLink } from "react-router-dom";
import "../css/ServicesHero.css";

export const ServicesHero = ({ cards }) => {
    return (
        <div className="container services-hero">
            <div className="row align-items-center hero-content">
                <div className="col-lg-6">
                    <span className="hero-subtitle"> SERVICIO DE ADMINISTRACIÓN DE EDIFICIOS</span>
                    <h2 className="hero-title">
                        Administración <span className="hero-title-highlight">que genera valor</span>
                    </h2>
                    <div className="hero-blueline"></div>
                    <p className="hero-description"> Nos encargamos de la administración de tu edificio para que tú te enfoques en lo que realmente importa: <span className="hero-description-highlight">tu comunidad y tu bienestar.</span>  </p>   
                </div>
                <div className="col-lg-6">
                    <div className="row hero-benefits">
                        <div className="col-3 benefit-item border-end">
                            <div className="benefit-icon">
                                <i className="fa-solid fa-chart-line"></i>
                            </div>
                            <h6 className="benefit-title">
                                Eficiencia operativa
                            </h6>
                        </div>
                        <div className="col-3 benefit-item border-end">
                            <div className="benefit-icon">
                                <i className="fa-solid fa-circle-dollar-to-slot"></i>
                            </div>
                            <h6 className="benefit-title">
                                Optimización de recursos
                            </h6>
                        </div>
                        <div className="col-3 benefit-item border-end">
                            <div className="benefit-icon">
                                <i className="fa-solid fa-comments"></i>
                            </div>
                            <h6 className="benefit-title">
                                Mejores decisiones
                            </h6>
                        </div>
                        <div className="col-3 benefit-item">
                            <div className="benefit-icon">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <h6 className="benefit-title">
                                Transparencia y Confianza
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-4 p-3 hero-cards">{
                cards.map((img, index) => {
                    return (
                        <div className="col-lg-3 col-md-6 col-12">
                            <Card key={index} url={img.url} title={img.title} subtitle={img.subtitle} buttonText={img.buttonText} buttonLink={img.buttonLink}  />
                        </div>
                    );
                })}
            </div>
            <div className="row g-4 p-3">
                <div className="col-12 text-center d-flex justify-content-center gap-3">
                    <NavLink to="/services">
                        <button className="btn btn-primary">
                            Explorar servicios
                        {/*    <i className="fa-solid fa-arrow-right ms-2"></i>*/}
                        </button>
                    </NavLink>
                    <NavLink to="/contact">
                        <button className="btn btn-primary">
                        Solicitar cotización
                        {/*    <i className="fa-solid fa-arrow-right ms-2"></i>*/}
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};