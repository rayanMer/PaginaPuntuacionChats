import { createContext, useContext } from "react";
import UseStorageState from '../useStorage/UseStorageState';
const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [email, setEmail] = UseStorageState("email", null)
    
    const login = (email) => {
        setEmail(email)
        localStorage.setItem("email", JSON.stringify(email))
    }

    const logout = () => {
        setEmail(null)
        localStorage.removeItem("email")
    }

    return (
        <AuthContext.Provider value={{email, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
