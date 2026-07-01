import "../css/Sidebar.css";

export const Sidebar = ({ isOpen }) => {

    return (
        <div className={isOpen ? "sidebar-visible bg-primary text-light p-2 Sidebar-container" : "sidebar-hidden"}>
            <h2>Menú Principal</h2>
            <p>Dashboard</p>
            <p>Pagos</p>
            <p>Reportes</p>
            <p>Mantenimiento</p>
            <p>Configuración</p>
        </div>
    );
};