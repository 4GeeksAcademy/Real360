import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Jumbotron } from "../components/Jumbotron.jsx";
import { Features } from "../components/Features.jsx";
import { Card } from "../components/Card.jsx";

export const Services = () => {

     const cardImages = [
            {url:"https://images.pexels.com/photos/20545013/pexels-photo-20545013.jpeg",title:"Gestionar tu Edificio", subtitle: "Optimiza la administración de tu edificio y mejora la experiencia de los residentes.."},
            {url:"https://images.pexels.com/photos/7714698/pexels-photo-7714698.jpeg",title:"Contratar Personal", subtitle: "Encuentra y contrata personal confiable para tu edificio de forma rápida y segura."},
            {url:"https://images.pexels.com/photos/19789841/pexels-photo-19789841.jpeg",title:"Acceder a Mantenimientos", subtitle: "Accede a servicios de mantenimiento especializados para mantener tu edificio en óptimas condiciones.."},
            {url:"https://images.pexels.com/photos/8470837/pexels-photo-8470837.jpeg",title:"Publicar tu Inmueble", subtitle: "Publica tu inmueble y encuentra compradores o inquilinos de forma más rápida y eficiente.."}
            ];

    return (
        <div>
            <div className="bg-primary-subtle m-2 p-2">
                <h2 className="jumbotron-title">Servicios</h2>
                <p className="jumbotron-subtitle">Dentro de nuestros portales podrás ...</p>
            </div>

            <div className="Container Features">
                <div className="row g-4 p-3">{
                    cardImages.map((img, index) => {
                        return (
                            <div className="col-lg-3 col-md-6 col-12">
                                <Card key={index} url={img.url} title={img.title} subtitle={img.subtitle} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}