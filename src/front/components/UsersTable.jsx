import { useState } from "react";
import { UserModal } from "./UserModal";

export const UsersTable = ({ users, reload }) => {

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <>
            <div className="table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.length === 0 ? (

                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay usuarios registrados.
                                </td>
                            </tr>

                        ) : (

                            users.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        {user.firstname} {user.lastname}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                user.rol === "Administrador"
                                                    ? "bg-danger"
                                                    : user.rol === "Propietario"
                                                    ? "bg-primary"
                                                    : user.rol === "Inquilino"
                                                    ? "bg-success"
                                                    : user.rol === "Vigilante"
                                                    ? "bg-warning text-dark"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {user.rol ?? "Pendiente"}
                                        </span>

                                    </td>

                                    <td>

                                        {user.is_active ? (
                                            <span className="badge bg-success">
                                                Activo
                                            </span>
                                        ) : (
                                            <span className="badge bg-secondary">
                                                Inactivo
                                            </span>
                                        )}

                                    </td>

                                    <td className="text-center">

                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            Editar
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {
                selectedUser && (
                    <UserModal
                        user={selectedUser}
                        reload={reload}
                        onClose={() => setSelectedUser(null)}
                    />
                )
            }

        </>
    );
};