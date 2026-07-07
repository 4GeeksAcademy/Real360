import { Navigate, Outlet } from "react-router-dom"
import storeReducer from "../store"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const PrivateRoute = () => {

    const {store, dispatch} = useGlobalReducer()
    const autentication = !store.token

    return store.token ? <Outlet /> : <Navigate to="/login" replace />
}