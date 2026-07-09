import "../css/Sidebar.css";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export const Sidebar = ({ isOpen }) => {

    const navigate = useNavigate();
    const [reportsOpen, setReportsOpen] = useState(false)

    const goToDashoard = () => {
        navigate('/dashboard')
    }
    const goToPayments = () => {
        navigate('/payments')
    }
    const goToWaterReport = () => {
        navigate('/water-usage')
    }
    const goToElectricityReport = () => {
        navigate('/electricity-usage')
    }
    const goToBudgetReport = () => {
        navigate('/budget')
    }
    const goToMaintenance = () => {
        navigate('/maintenance')
    }
    const goToSettings = () => {
        navigate('/settings')
    }

    const toggleReports = () => {
        setReportsOpen(prev => !prev)
    }

    return (
        <div className={isOpen ? "sidebar-visible bg-primary text-light p-2 Sidebar-container p-3" : "sidebar-hidden"}>
            <div className="d-flex row justify-content-start">
                <h2>Menú Principal</h2>
                <button type="button" className="btn btn-primary" onClick={goToDashoard}>Dashboard</button>
                <button type="button" className="btn btn-primary" onClick={goToPayments}>Pagos</button>
                <button type="button" className="btn btn-primary" onClick={toggleReports}>Reportes
                    <i className={`fa-solid ${reportsOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </button>
                {reportsOpen && (
                    <div className="d-flex row justify-content-center m-2">
                        <button type="button" className="btn btn-info m-2" onClick={goToWaterReport} >Consumo de Agua</button>
                        <button type="button" className="btn btn-info m-2" onClick={goToElectricityReport}>Consumo de Energía</button>
                        <button type="button" className="btn btn-info m-2" onClick={goToBudgetReport}>Presupuesto</button>
                    </div>
                )}
                <button type="button" className="btn btn-primary" onClick={goToMaintenance}>Mantenimiento</button>
                <button type="button" className="btn btn-primary" onClick={goToSettings}>Configuración</button>
            </div>
    </div>
    );
};