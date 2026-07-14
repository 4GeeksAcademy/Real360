import { Dashboard } from "./Dashboard";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export const ResetPassword = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    
    const returnToDashboard = () => {
            navigate('/portal/dashboard'); 
    };

    const handleSubmit = async () => {
        if(password === "" || newPassword === "" || confirmNewPassword === ""){
            alert("Error, datos incorrectos")
            return
        }
        if(newPassword != confirmNewPassword){
            alert("Error, las contraseñas no coinciden")
            return
        }
        if(newPassword.length < 8 || newPassword.length > 20){
                alert("error, la contraseña debe tener entre 8 y 20 caracteres")
                return
            }
        await UpdatePassword(password, newPassword)

    }

    const UpdatePassword = async (password, newPassword) => {

        const tokenGuardado = localStorage.getItem("token");

        try {
            const response = await fetch("https://scaling-funicular-g49wp9x6qw57c9p5q-3001.app.github.dev/api/change-password" , {
                method: "POST",
                body: JSON.stringify({
                    "current_password": password,
                    "new_password": newPassword
                }),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                }
            })
            const data = await response.json()

            if(response.ok){
                alert(data.msg)

                navigate('/login')
            }
            else{
                alert(data.msg)
            }
        }   
        catch(error){
            console.error("Error uploading password: ", error)
        }
    }

    return (
        <div>
            <div className="p-2 m-2 w-75">
                <h2 className="mb-4 fw-bold text-primary">
                        Actualiza tu Contraseña
                </h2>
                <label for="inputPassword5" className="form-label">Contraseña Actual</label>
                <input type="password" id="inputPassword5" className="form-control m-2" aria-describedby="passwordHelpBlock" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <label for="inputPassword5" className="form-label">Nueva Contraseña</label>
                <input type="password" id="inputPassword5" className="form-control m-2" aria-describedby="passwordHelpBlock" value={newPassword} onChange={(event)=>setNewPassword(event.target.value)}/>
                <div id="passwordHelpBlock" className="form-text mb-4">
                    Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe incluir espacios, caracteres especiales ni emojis.
                </div>
                <label for="inputPassword5" className="form-label">Confirmar Nueva Contraseña</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" value={confirmNewPassword} onChange={(event)=>setConfirmNewPassword(event.target.value)}/>
            </div>
            <div className="m-2 p-2">
                <button type="button" className="btn btn-primary m-2" onClick={handleSubmit}>Enviar</button>
                <button type="button" className="btn btn-danger m-2" onClick={returnToDashboard}>Cancelar</button>
            </div>
        </div>
    )
}