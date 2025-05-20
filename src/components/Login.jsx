import { useState } from "react"

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState("")
    const [error, setError] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handleLogin = (e) =>  {
        e.preventDefault()
        if(isEmailValid()) {
            alert("!Funcion por inplementar!")
        }
    }

    const isEmailValid = () => {
        if(!emailRegex.test(userEmail)) {
            setError("Correo electronico no valido")
            return false
        }
        setError("")
        return true
    }

    return (
        // Pagina
        <div className="h-screen bg-white 
        flex items-center justify-center">
            {/* Contenedor que se centra */}
            <div className="flex flex-col items-center">
                {/* Titulo */}
                <h1 className="text-[2em] text-sapphire py-10"
                >Te damos la bienvenida!</h1>
                {/* Contendor con el input */}
                <form className="bg-light-green px-20 py-5
                rounded-lg min-w-130
                border-1 border-dark-green"
                onSubmit={handleLogin} noValidate>
                    <p className="text-xl text-sapphire py-9">
                        Introduce tu correo electrónico</p>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-white w-full p-3 rounded-lg"
                        placeholder="Correo electronico" 
                    />
                    {
                        (
                            error && 
                            <p className="text-red-500 font-bold py-2"
                            >{error}</p>
                        )
                    }
                    <div className="flex justify-end pt-15 pb-10">
                        <button
                        type="submit"
                        className="bg-dark-green text-white px-3 py-2 
                        rounded-lg cursor-pointer"
                        >Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    ) 
}

export default LoginPage