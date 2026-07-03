import { Dashboard } from "./Dashboard";
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {

    const navigate = useNavigate();
    
    const returnToDashboard = () => {
            navigate('/dashboard'); 
    };

    return (
        <div>
            <div className="p-2 m-2 w-75">
                <h2 className="mb-4 fw-bold text-primary">
                        Actualiza tu Contraseña
                </h2>
                <label for="inputPassword5" className="form-label">Contraseña Actual</label>
                <input type="password" id="inputPassword5" className="form-control m-2" aria-describedby="passwordHelpBlock" />
                <label for="inputPassword5" className="form-label">Nueva Contraseña</label>
                <input type="password" id="inputPassword5" className="form-control m-2" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text mb-4">
                    Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe incluir espacios, caracteres especiales ni emojis.
                </div>
                <label for="inputPassword5" className="form-label">Confirmar Nueva Contraseña</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
            </div>
            <div className="m-2 p-2">
                <button type="button" className="btn btn-primary m-2">Enviar</button>
                <button type="button" className="btn btn-danger m-2" onClick={returnToDashboard}>Cancelar</button>
            </div>
        </div>
    )
}