import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/Topbar.css";
import { useEffect } from 'react';

export const Topbar = ({ toggleSidebar }) => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    console.log(store)
    console.log(store.user);


    useEffect(() => {
        console.log("Usuario:", store.user);
    }, [store.user]);
    const resetPassword = () => {
        navigate('/resetPassword');
    };

    const logOut = () => {
        dispatch({
            type: "logout",
        })

        localStorage.removeItem("user")
        localStorage.removeItem("token")

        navigate('/login')

    };

    const editProfile = () => {
        navigate('/editProfile');
    };

    return (
        <div className="d-flex justify-content-between align-items-center bg-light border">
            <div>
                <button type="button" className="btn btn-light" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
            </div>
            <div className="d-flex align-items-center">
            </div>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-bell"></i>
                <div className="dropdown d-flex justify-content-end align-items-center">
                    <a className="btn dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {/*<img src='https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='img-topbar'/>*/}
                        <i className="fa-solid fa-user"></i>
                        <div className='d-flex flex-column ms-2'>
                            <span className="fw-bold">{store.user?.firstname} {store.user?.lastname}</span>
                            <small className="text-muted">{store.user?.rol}</small>
                        </div>
                    </a>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={editProfile}>Editar Perfil</a></li>
                        <li><a className="dropdown-item" href="#" onClick={resetPassword}>Actualizar Contraseña</a></li>
                        <li><button className="dropdown-item text-danger" onClick={logOut}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};