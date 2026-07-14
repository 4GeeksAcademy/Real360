import React from "react";
import service1 from "../assets/img/b1-gestion-eficiente.png";
import service2 from "../assets/img/contratacion-personal-1.png";
import service3 from "../assets/img/b3-cuidamos-tu-propiedad.png";
import service4 from "../assets/img/b4-comunicacion-constante.jpg";
import { CardDetail } from "./CardDetail";

export const ServicesCarousel = () => {
    const cardImages = [
        {
            url: service1, title: "Gestión Financiera",
            description: "Administramos los recursos económicos del edificio de manera ordenada y transparente, asegurando un adecuado control de ingresos, gastos y obligaciones para una gestión financiera eficiente.",
            activity1: "Elaboración y seguimiento del presupuesto del edificio.",
            activity2: "Control eficiente de ingresos, pagos y gastos comunes.",
            activity3: "Gestión de cobranzas y seguimiento constante de morosidad.",
            activity4: "Elaboración de reportes financieros para la Junta de Propietarios."
        },
        {
            url: service2, title: "Gestión de Personal",
            description: "Gestionamos el personal del edificio asegurando una adecuada selección, coordinación y supervisión, para contar con colaboradores eficientes y comprometidos.",
            activity1: "Coordinación y supervisión constante del personal del edificio.",
            activity2: "Control de asistencia, horarios y cumplimiento de funciones.",
            activity3: "Apoyo en la selección y contratación de personal calificado.",
            activity4: "Evaluación del desempeño y seguimiento de necesidades del equipo."
        },
        {
            url: service3, title: "Mantenimientos",
            description: "Coordinamos y supervisamos los mantenimientos del edificio asegurando el correcto funcionamiento de sus instalaciones, conservando su valor y brindando espacios seguros.",
            activity1: "Mantenimiento de sistemas eléctricos y alumbrado de áreas comunes.",
            activity2: "Mantenimiento de bombas de agua y sistemas sanitarios",
            activity3: "Mantenimiento de equipos y sistemas de seguridad del edificio.",
            activity4: "Mantenimiento de áreas comunes, infraestructura y acabados."

        },
        {
            url: service4, title: "Comunicación y Documentos",
            description: "Gestionamos la comunicación y documentación del edificio de manera ordenada y oportuna, facilitando el acceso a información relevante y asegurando un adecuado control de la información.",
            activity1: "Elaboración y difusión de comunicados, avisos y novedades del edificio.",
            activity2: "Gestión y organización de documentos administrativos de la comunidad.",
            activity3: "Registro y seguimiento de acuerdos de la Junta de Propietarios.",
            activity4: "Administración de reportes, actas y documentación relevante del edificio."
        }
    ];
    return (
        <div className="Container services-carousel">
            <div className="row g-4 p-3 services-carousel-row">
                {
                    cardImages.map((img, index) => (

                        <div
                            key={index}
                            className="col-lg-4 col-md-12 col-12 service-card-item"
                        >
                            <CardDetail
                                url={img.url}
                                title={img.title}
                                description={img.description}
                                activity1={img.activity1}
                                activity2={img.activity2}
                                activity3={img.activity3}
                                activity4={img.activity4}
                            />
                        </div>
                    ))
                }
            </div>
        </div >
    );
};