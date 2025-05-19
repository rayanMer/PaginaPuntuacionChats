import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState("")

    const handleLogin = () =>  {
        alert("!Funcion por inplementar!")
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
                <div className="bg-light-green px-20 py-5
                rounded-lg min-w-130
                border-1 border-dark-green">
                    {/* Mensaje */}
                    <p className="text-xl text-sapphire py-9">
                        Introduce tu correo electrónico</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white w-full px-1 py-3 rounded-lg"
                        placeholder="Correo electronico" 
                    />
                    <div className="flex justify-end pt-15 pb-10">
                        <button
                        onClick={() => handleLogin()}
                        className="bg-dark-green text-white px-3 py-2 
                        rounded-lg cursor-pointer"
                        >Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default LoginPage