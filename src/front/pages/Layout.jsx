import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar"
import { Topbar } from "../components/Topbar"
import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {

    const { store, dispatch } = useGlobalReducer();
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const toggleSidebar = () => {
        setSideBarOpen(prev => !prev);
    };

    return (
        <ScrollToTop>
            {!store.user && <div className="container layout">
                <Navbar />
                    <Outlet />           
                <Footer />
            </div>
            }
            
            {store.user && <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Sidebar isOpen={sideBarOpen}/>
                </div>
                <div className="w-100 right-container">
                    <Topbar toggleSidebar={toggleSidebar}/>
                    <Outlet /> 
                </div>
            </div>}
        </ScrollToTop>
    )
}