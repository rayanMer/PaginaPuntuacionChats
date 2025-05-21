import { Link } from "react-router-dom"
import { useAuth } from "../services/login/AuthProvider"

const Header = () => {
    const {email, logout} = useAuth()

    return (
        <header className="bg-lightest-green sticky top-0 z-69420 pl-5 pr-15 py-5
        flex justify-between items-center">
            <div>
                <p className="text-sapphire text-xl"
                >Valoracion de los chats por el medico: {email}</p>
            </div>
            <div className="flex items-center gap-5">
                <Link to="/login">
                    <button className="px-4 py-2 shadow-lg cursor-pointer
                    bg-red-500 text-white rounded hover:bg-red-600">
                        <p className="text-md">Cerrar sesión</p>
                    </button>
                </Link>
                <Link to="/historial">
                    <div className="flex items-center gap-1 bg-white p-2 shadow-lg
                    border-1 border-sapphire rounded-lg text-sapphire
                    hover:bg-gray-50">
                    <img 
                        src="/icons/icono-historial.svg"
                        className="w-5"
                    />
                    <p className="text-md">Historial</p>
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header