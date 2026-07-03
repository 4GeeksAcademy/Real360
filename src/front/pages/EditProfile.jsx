import { Dashboard } from "./Dashboard";
import { useNavigate } from 'react-router-dom';

export const EditProfile = () => {

    const navigate = useNavigate();

    const returnToDashboard = () => {
        navigate('/dashboard');
    };

    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center m-2">
                    <h2 className="mb-4 fw-bold text-primary">
                        Edita tu Perfil
                    </h2>
                    <form >
                        <div className="row mb-3 p-2">
                            <div className="col-md-6 mb-2">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Apellido</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Número de Departamento</label>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="form-label">Nombre del Edificio</label>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Foto de perfil</label>
                                <input type="file" className="form-control" accept="image/*" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary"> Actualizar Datos</button>
                        <button type="button" className="btn btn-danger m-2" onClick={returnToDashboard}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}