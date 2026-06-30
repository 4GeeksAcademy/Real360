import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar"
import { Topbar } from "../components/Topbar"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="container layout">
                <Navbar />
                    <Outlet />                
                <Footer />
            </div>
            {/*<div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Sidebar />
                </div>
                <div>
                    <Topbar />
                </div>
            </div>*/}
        </ScrollToTop>
    )
}