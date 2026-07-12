import { Outlet, Navigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// Private layout for authenticated users. Includes Sidebar, Topbar and route protection.
export const PrivateLayout = () => {

    const { store } = useGlobalReducer();
    const [sideBarOpen, setSideBarOpen] = useState(true);

    if (!store.token || !store.user) {
        return <Navigate to="/login" replace />;
    }  

    const toggleSidebar = () => {
        setSideBarOpen(prev => !prev);
    };

    return (
        <ScrollToTop>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Sidebar isOpen={sideBarOpen} />
                </div>
                <div className="w-100 h-100 bg-white">
                    <Topbar toggleSidebar={toggleSidebar} />
                    <Outlet />
                </div>
            </div>
        </ScrollToTop>
    )
}