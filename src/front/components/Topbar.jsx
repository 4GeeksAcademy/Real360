import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Topbar = ({ toggleSidebar }) => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const resetPassword = () => {
        navigate('/resetPassword'); 
    };

    const logOut = () => {
        navigate('/login'); 
    };

    return (
        <div className="d-flex justify-content-between align-items-center p-2 bg-light border">
            <div>
                <button type="button" className="btn btn-light" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
            </div>
            <div className="d-flex align-items-center">
            </div>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-bell"></i>
                <div className="dropdown d-flex justify-content-end p-2 m-2">
                    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {/*Dropdown link*/}
                        {store.user.email}
                    </a>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Editar Perfil</a></li>
                        <li><a className="dropdown-item" href="#" onClick={resetPassword}>Actualizar Contraseña</a></li>
                        <li><a className="dropdown-item text-danger" href="#" onClick={logOut}>Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};