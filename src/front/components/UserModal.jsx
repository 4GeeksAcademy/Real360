import { useState, useEffect } from "react";

export const UserModal = ({ user, reload, onClose }) => {

    const [rol, setRol] = useState(user.rol ?? "Pendiente");
    const [isActive, setIsActive] = useState(user.is_active);

    const handleSave = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        rol,
                        is_active: isActive,
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar el usuario.");
            }

            reload();
            onClose();

        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar el usuario.");
        }
    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Editar Usuario
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <label className="form-label">
                                Nombre
                            </label>

                            <input
                                className="form-control"
                                value={`${user.firstname} ${user.lastname}`}
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Correo
                            </label>

                            <input
                                className="form-control"
                                value={user.email}
                                disabled
                            />
                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Rol
                            </label>

                            <select
                                className="form-select"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Propietario">Propietario</option>
                                <option value="Inquilino">Inquilino</option>
                                <option value="Vigilante">Vigilante</option>
                                <option value="Conserje">Conserje</option>
                            </select>

                        </div>

                        <div className="form-check">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                id="isActive"
                            />

                            <label
                                className="form-check-label"
                                htmlFor="isActive"
                            >
                                Usuario activo
                            </label>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};