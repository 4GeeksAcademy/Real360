import "../css/Footer.css";

export const Footer = () => {
	return (
		<footer className="footer py-2 text-center">
			<p>© {new Date().getFullYear()} REAL 360. Todos los derechos reservados.</p>
		</footer>
	);
};
