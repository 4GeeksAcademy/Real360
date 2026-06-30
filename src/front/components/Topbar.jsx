export const Topbar = () => {

    return (
        <div className="d-flex justify-content-bewteen bg-light border">
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
                        <li><a className="dropdown-item" href="#">Actualizar Contraseña</a></li>
                        <li><a className="dropdown-item text-danger" href="#">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};