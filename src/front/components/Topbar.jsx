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

    console.log(store.user?.profile_image_url);
    console.log(typeof store.user?.profile_image_url);

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
                        {store.user?.profile_image_url ? (
                            <img src={store.user.profile_image_url} alt="Perfil" className='img-topbar rounded-circle' />
                        ) : (
                            <i className="fa-solid fa-user"></i>
                        )
                        }
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