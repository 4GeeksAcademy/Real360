import { Dashboard } from "./Dashboard";
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const EditProfile = () => {

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const [firstname, setFirstname] = useState(store.user.firstname || "")
    const [lastname, setLastname] = useState(store.user.lastname || "")
    const [profileImage, setProfileImage] = useState(store.user.profile_image_url || "")


    const returnToDashboard = () => {
        navigate('/portal/dashboard');
    };

    const handdleFileCange = (event) => {
        console.log("File selected: ", event.target.files[0]);
        const image = event.target.files[0];
        setProfileImage(image);
    };

    const uploadtoCloudinary = async () => {

        if (!profileImage) {
            console.log("No file selected for upload")
            return
        }

        const formData = new FormData()

        console.log("Uploading file", formData)

        formData.append("file", profileImage)
        formData.append("upload_preset", "Real 360")

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dtt1xch7h/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            return data.secure_url

        }
        catch (error) {
            console.error("Error uploading image:", error)
        }
    }
    console.log(store.user);

    const updateProfile = async (event) => {

        event.preventDefault()

        let profileImageUrl = store.user.profile_image_url

        if (profileImage instanceof File) {
            profileImageUrl = await uploadtoCloudinary()

            console.log(profileImageUrl);

            if (!profileImageUrl) {
                alert("No fue posible subir la imagen.");
                return;
            }
        }
        else if (profileImage === null) {
            profileImageUrl = null
        }
        console.log(store.token);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/editProfile`, {
            method: 'PUT',
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "profile_image_url": profileImageUrl
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.token}`
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                if (res.ok) {
                    dispatch({
                        type: "set_user",
                        payload: {
                            "firstname": firstname,
                            "lastname": lastname,
                            "profile_image_url": profileImageUrl
                        }
                    })
                    localStorage.setItem("user", JSON.stringify({
                        ...store.user,
                        "firstname": firstname,
                        "lastname": lastname,
                        "profile_image_url": profileImageUrl
                    }));
                }
                return res.json();
            })
            .then(data => console.log(data))
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
                            <div className="mt-3">
                                <label className="form-label">Foto de perfil</label>
                                <input type="file" multiple={false} accept="image/*" className="form-control" onChange={handdleFileCange} />
                                {profileImage && (
                                    <div className="d-flex align-items-center">
                                        <img src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage} alt="Selected" className="img-thumbnail object-fit.cover me-2" style={{ width: '100px', height: '100px' }} />
                                        <span>{profileImage instanceof File ? profileImage.name : "Foto Actual"}</span>
                                        <button type="button" className="btn btn-warning ms-3" onClick={() => setProfileImage(null)}>Eliminar Imagen</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(event) => updateProfile(event)}> Actualizar Datos</button>
                        <button type="button" className="btn btn-danger m-2" onClick={returnToDashboard}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}