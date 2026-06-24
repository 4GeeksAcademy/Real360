import React from "react";
import Card from "./Card";

const Features = () => {
	const cardImages = [
		{url:"https://images.pexels.com/photos/20545013/pexels-photo-20545013.jpeg",title:"Gestiona tu Edificio", subtitle: "Optimiza la administración de tu edificio y mejora la experiencia de los residentes.."},
		{url:"https://images.pexels.com/photos/7714698/pexels-photo-7714698.jpeg",title:"Contratación de Personal", subtitle: "Encuentra y contrata personal confiable para tu edificio de forma rápida y segura."},
		{url:"https://images.pexels.com/photos/19789841/pexels-photo-19789841.jpeg",title:"Mantenimientos", subtitle: "Accede a servicios de mantenimiento especializados para mantener tu edificio en óptimas condiciones.."},
		{url:"https://images.pexels.com/photos/8470837/pexels-photo-8470837.jpeg",title:"Publica tu Inmueble", subtitle: "Publica tu inmueble y encuentra compradores o inquilinos de forma más rápida y eficiente.."}
	];
  return (
    <div className = "Container Features">
      <div className = "row g-4 p-3">{
						cardImages.map((img,index) => {
							return (
								<div className="col-lg-3 col-md-6 col-12">
									<Card key={index} url={img.url} title={img.title} subtitle={img.subtitle}/>
								</div>
							);
						})}					
				</div>
    </div>
  )
}

export default Features;