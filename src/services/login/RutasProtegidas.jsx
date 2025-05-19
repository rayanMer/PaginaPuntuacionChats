import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"


const RutasProtegidas = ({children}) => {
    const {email} = useAuth()
    return email ? children : <Navigate to="/login" />
}

export default RutasProtegidas