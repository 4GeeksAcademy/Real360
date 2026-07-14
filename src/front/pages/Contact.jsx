import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const Contact = () => {

    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [subject, setSubject] = useState()
    const [message, setMessage] = useState()


    const storeData = () => {

    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-lg-10">

                    <div className="card shadow-lg border-0">

                        <div className="row g-0">

                            <div className="col-lg-6">
                                <div className="card-body p-5">
                                    <h2 className="text-center text-primary mb-3">
                                        Contáctanos
                                    </h2>

                                    <p className="text-center text-muted mb-4">
                                        ¿Tienes alguna duda o necesitas más información?
                                        Completa el siguiente formulario y nos pondremos
                                        en contacto contigo lo antes posible.
                                    </p>
                                    <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput" className="form-label">Nombre Completo:</label>
                                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre Completo" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">Correo Electrónico:</label>
                                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Correo Electrónico" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">Asunto</label>
                                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Asunto" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "180px" }}></textarea>
                                        <label htmlFor="floatingTextarea2">Mensaje</label>
                                    </div>
                                    <button type="button" className="btn btn-primary mt-3 px-5">Enviar</button>


                                </div>
                            </div>

                            <div className="col-lg-6 d-none d-lg-block" style={{
                                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1669658981858-b2ae0d7581a3?q=80&w=1454&auto=format&fit=crop')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                minHeight: "100%",
                                borderTopRightRadius: "0.375rem",
                                borderBottomRightRadius: "0.375rem"
                            }}>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}