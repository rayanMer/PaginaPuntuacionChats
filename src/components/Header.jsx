import { Link } from "react-router-dom"
import { useAuth } from "../services/login/AuthProvider"

const Header = () => {
    const {email} = useAuth()

    return (
        <header className="sticky top-0 z-69420 pl-5 pr-15 pt-5
        flex justify-between items-center">
            <div>
                <p className="text-sapphire text-xl"
                >Valoracion de los chats por el medico: {email}</p>
            </div>
            <div>
                <Link to="/historial">
                    <div className="flex items-center gap-1 text-sapphire hover:underline">
                    <img 
                        src="/icons/icono-historial.svg"
                        className="w-5"
                    />
                    <p className="text-lg">Historial</p>
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header