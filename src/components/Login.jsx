import { useState } from "react"
import { useAuth } from "../services/login/AuthProvider"
import { useNavigate } from "react-router-dom"
import ServicioAuth from "../services/ServicioAuth"

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handleLogin = async (e) => {
        e.preventDefault()
        const validEmail = isEmailValid()
        const validPassword = isPasswordValid()
        if (!validEmail || !validPassword) return

        try {
            await ServicioAuth.login(userEmail, password)
            login(userEmail)
            navigate("/")
        } catch (err) {
            setPasswordError(err.message || "Error en autenticación")
        }
    }

    const isEmailValid = () => {
        if (!emailRegex.test(userEmail)) {
            setError("Correo electrónico no válido")
            return false
        }
        setError("")
        return true
    }

    const isPasswordValid = () => {
        if (password.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres")
            return false
        }
        setPasswordError("")
        return true
    }

    return (
        <div className="h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="text-[2em] text-sapphire py-10">
                    ¡Te damos la bienvenida!
                </h1>
                <form
                    className="bg-light-green px-20 py-5 rounded-lg min-w-130 border-1 border-dark-green"
                    onSubmit={handleLogin}
                    noValidate
                >
                    <p className="text-xl text-sapphire py-4">Introduce tu correo electrónico</p>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-white w-full p-3 rounded-lg"
                        placeholder="Correo electrónico"
                    />
                    {error && (
                        <p className="text-red-500 font-bold py-2">{error}</p>
                    )}

                    <p className="text-xl text-sapphire py-4">Introduce tu contraseña</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white w-full p-3 rounded-lg"
                        placeholder="Contraseña"
                    />
                    {passwordError && (
                        <p className="text-red-500 font-bold py-2">{passwordError}</p>
                    )}

                    <div className="flex justify-end pt-10 pb-10">
                        <button
                            type="submit"
                            className="bg-dark-green text-white px-3 py-2 rounded-lg cursor-pointer"
                        >
                            Siguiente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
