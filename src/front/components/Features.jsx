import React from "react";
import { Card } from "./Card";
import beneficio1 from "../assets/img/b1-gestion-eficiente.png";
import beneficio2 from "../assets/img/b2-morosidad-controlada.png";
import beneficio3 from "../assets/img/b3-cuidamos-tu-propiedad.png";
import beneficio4 from "../assets/img/b4-comunicacion-constante.jpg";

export const Features = () => {
	const cardImages = [
		{ url: beneficio1, title: "Gestión Transparente", subtitle: "Gestionamos de manera eficiente tus cuotas, ingresos y gastos, con reportes claros y transparentes para una mejor toma de decisiones." },
		{ url: beneficio2, title: "Control de morosidad", subtitle: "Contribuimos a reducir la morosidad del edificio implementando alertas oportunas y un seguimiento preciso de los pagos pendientes." },
		{ url: beneficio3, title: "Cuidado de tu Propiedad", subtitle: "Realizamos los mantenimientos oportunos y aseguramos que tu propiedad siempre esté limpia, operativa y presentable." },
		{ url: beneficio4, title: "Comunicación Oportuna", subtitle: "Mantenemos a todos los residentes informados y siempre comunicados con avisos claros, oportunos y constantes." }
	];
	return (
		<div className="Container features">
			<div className="row g-4 p-3 features-row">{
				cardImages.map((img, index) => {
					return (
						<div className="col-lg-3 col-md-6 col-12 feature-col">
							<Card key={index} url={img.url} title={img.title} subtitle={img.subtitle} />
						</div>
					);
				})}
			</div>
		</div>
	);
};