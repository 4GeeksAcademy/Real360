import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Jumbotron from "../components/Jumbotron.jsx";
import Features from "../components/Features.jsx";
import { useNavigate } from "react-router-dom";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

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
			<Jumbotron />
			<div className="bg-secondary-subtle mt-2">
				<h2 className="jumbotron-title m-2">Todo lo que tu edificio necesita, en un solo lugar</h2>
				<p className="jumbotron-subtitle m-2">
				Brindamos una plataforma integral para la administración de edificios y bienes
    			raíces, facilitando la gestión operativa, el mantenimiento, la contratación de
    			personal y la promoción de inmuebles.
				</p>
				<div className="d-flex justify-content-center m-2">
					<img src="https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-25"/>
				</div>
				<div className="d-flex justify-content-center">
					<button type="button" className="btn btn-info m-3" onClick={()=>navigate("/Services")}>Conoce más</button>
				</div>
			</div>
		</>
	);
}; 