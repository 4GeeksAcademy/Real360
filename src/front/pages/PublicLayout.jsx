import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import "../css/Navbar.css";
import "../css/Footer.css";

// Layout for all public pages. It includes the Navbar, Footer and ScrollToTop behavior.
export const PublicLayout = () => {
    return (
        <ScrollToTop>
            <div className="container layout-public">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </ScrollToTop>
    )
}