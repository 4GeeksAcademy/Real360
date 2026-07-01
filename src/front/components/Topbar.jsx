import { useNavigate } from 'react-router-dom';

export const Topbar = ({ toggleSidebar }) => {

    const navigate = useNavigate();

    const resetPassword = () => {
        navigate('/resetPassword'); 
    };

    return (
        <div className="d-flex justify-content-bewteen align-items-center p-2 bg-light border">
            <div>
                <button type="button" className="btn btn-light" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
            </div>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-bell"></i>
            </div>
            <div>
                <div className="dropdown p-2 m-2">
                    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown link
                    </a>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Editar Perfil</a></li>
                        <li><a className="dropdown-item" href="#" onClick={resetPassword}>Actualizar Contraseña</a></li>
                        <li><a className="dropdown-item text-danger" href="#">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};