import { Dashboard } from "./Dashboard";
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const EditProfile = () => {

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const [firstname, setFirstname] = useState(store.user.firstname || "")
    const [lastname, setLastname] = useState(store.user.lastname || "")
    const [dateTime, setDateTime] = useState(store.user.dateTime || "")
    const [apartmentNumber, setApartmentNumber] = useState(store.user.apartmentNumber || "")
    const [apartmentName, setApartmentName] = useState(store.user.apartmentName || "")
    const [profileImage, setProfileImage] = useState(store.user.profileImage || "")

    console.log(firstname)


    const returnToDashboard = () => {
        navigate('/dashboard');
    };

    const updateProfile = () => {
        fetch('https://scaling-funicular-g49wp9x6qw57c9p5q-3001.app.github.dev/editProfile', {
            method: 'PUT',
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname
            }),
            headers: {
                'Content-Type': 'application/json',
                'autorization': ''
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));
    }

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
                                <input type="text" className="form-control" value={firstname} onChange={event => setFirstname(event.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Apellido</label>
                                <input type="text" className="form-control" value={lastname} onChange={event => setLastname(event.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" value={dateTime} onChange={event => setDateTime(event.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Número de Departamento</label>
                                <input type="text" className="form-control" value={apartmentNumber} onChange={event => setApartmentNumber(event.target.value)} />
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="form-label">Nombre del Edificio</label>
                                <input type="text" className="form-control" value={apartmentName} onChange={event => setApartmentName(event.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Foto de perfil</label>
                                <input type="file" className="form-control" accept="image/*" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => updateProfile()}> Actualizar Datos</button>
                        <button type="button" className="btn btn-danger m-2" onClick={returnToDashboard}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}