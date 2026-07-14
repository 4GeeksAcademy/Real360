import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Jumbotron } from "../components/Jumbotron.jsx";
import { ServicesHero } from "../components/ServicesHero.jsx";
import { useNavigate } from "react-router-dom";

import imageHome1 from "../assets/img/sistema-real360.png";
import serviceHero1 from "../assets/img/b1-gestion-eficiente.png";
import serviceHero2 from "../assets/img/contratacion-personal-1.png";
import serviceHero3 from "../assets/img/b3-cuidamos-tu-propiedad.png";
import serviceHero4 from "../assets/img/b4-comunicacion-constante.jpg";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
	const servicesCards = [
		{ url: serviceHero1, title: "Gestión Financiera", subtitle: "Gestionamos de forma eficiente tus cuotas, ingresos y gastos con reportes claros y transparentes.", buttonText:"Conoce nuestros servicios",buttonLink:"/services" },
		{ url: serviceHero2, title: "Gestión del Personal", subtitle: "Contamos con personal capacitado y orientado al servicio asegurando el bienestar del edificio.", buttonText:"Conoce nuestros servicios",buttonLink:"/services" },
		{ url: serviceHero3, title: "Mantenimientos", subtitle: "Realizamos los mantenimientos para que tu propiedad siempre esté en óptimas condiciones.", buttonText:"Conoce nuestros servicios",buttonLink:"/services" },
		{ url: serviceHero4, title: "Comunicados", subtitle: "Mantenemos informados a los residentes con avisos claros y oportunos.", buttonText:"Conoce nuestros servicios",buttonLink:"/services" }
	];

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<>
			<Jumbotron
				title="Tecnología que simplifica la administración"
				subtitle = "Tecnología para administrar edificios"
				description = "Software diseñado para administradores y residentes que automatiza la gestión diaria del edificio, centraliza la información y reduce errores brindando mayor visibilidad y control sobre cada proceso."
				image={imageHome1}
				buttonText="Solicita tu demo"
				buttonLink="/contact"
			/>
			<ServicesHero cards={servicesCards} />
		</>
	)
}; 