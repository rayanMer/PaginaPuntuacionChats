const ESTILOS_BURBUJAS = {
    user: "bg-lightest-green self-start rounded-tr-xl",
    assistant: "bg-off-white self-end rounded-tl-xl"
}

const PanelConversacion = ({mensajes}) => {
    let mensajesChat = []
    if(mensajes[0]?.role === "system") {
        mensajesChat = mensajes.slice(1)
    } else {
        mensajesChat = mensajes
    }

    return (
        <div className="min-h-100 max-w-200 md:w-250 xl:w-500
        bg-white rounded-lg shadow-lg px-10 pt-10 pb-5
        flex flex-col justify-start items-start gap-4 overflow-y-scroll">
            {
                (
                    mensajesChat.map((mensaje, index) => (
                        <div key={index} 
                            className={`max-w-100 p-3 rounded-b-xl
                            ${mensaje.role === "user" ? ESTILOS_BURBUJAS.user : ESTILOS_BURBUJAS.assistant}`}
                        >
                            <p className="text-sm text-gray-700">{mensaje.role}</p>
                            <p>{mensaje.content}</p>
                        </div>
                    ))
                )
            }
            <p className="self-center italic text-gray-500 pt-5">Fin de la conversación</p>
        </div>
    )
}

export default PanelConversacion