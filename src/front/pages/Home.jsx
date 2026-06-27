import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Jumbotron } from "../components/Jumbotron.jsx";
import { Features } from "../components/Features.jsx";
import { CallToAction } from "../components/CallToAction.jsx";
import { WhatsAppCTA } from "../components/WhatsAppCTA.jsx";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"
import "../css/Navbar.css";
import "../css/Footer.css";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
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
			<Features />
			<CallToAction />
		</>
	);
}; 