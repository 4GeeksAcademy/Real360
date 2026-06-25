import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Jumbotron from "../components/Jumbotron.jsx";
import Features from "../components/Features.jsx";

export const Contact = () => {

    return (
        <div className="m-2 p-2">
            <div className="bg-primary-subtle">
                <h2 className="jumbotron-title">Contáctanos</h2>
                <p className="jumbotron-subtitle">Por favor, escribe tus datos personales y selecciona el botón <strong>Enviar</strong></p>
                <p className="jumbotron-subtitle">Nos comunicaremos contigo en los próximos días</p>
            </div>
            <div className="d-flex flex-column align-items-center m-2 p-2">
                <div className="mb-3 w-25">
                    <label for="formGroupExampleInput" className="form-label">Nombre Completo:</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre Completo" />
                </div>
                <div className="mb-3 w-25">
                    <label for="formGroupExampleInput2" className="form-label">Correo Electrónico:</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Correo Electrónico" />
                </div>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                    <label for="floatingTextarea2">Mensaje</label>
                </div>
                <button type="button" className="btn btn-primary mt-3 w-25">Enviar</button>
            </div>
        </div>
    )
}