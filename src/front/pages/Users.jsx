import { useEffect, useState } from "react";
import { UsersTable } from "../components/UsersTable";

export const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );

        const data = await response.json();

        console.log("Usuarios recibidos:", data);

        setUsers(data);
    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">
                Gestión de Usuarios
            </h2>

            <UsersTable
                users={users}
                reload={loadUsers}
            />

        </div>

    );
};