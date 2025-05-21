import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ServicioLecturaConversacion from "../services/ServicioLecturaConversacion";
import LocalStorageServicio from "../services/useStorage/storage";

const DetalleValoracion = () => {
  const { id } = useParams();

  const [valoracion, setValoracion] = useState([]);

  useEffect(() => {
    ServicioLecturaConversacion.obtenerValoracionesPorId(id)
      .then((response) => {
        setValoracion(response.data);
      })
      .catch((error) =>
        console.error("No se ha encontrado la valoración", error)
      );
  }, []);

  const navigate = useNavigate()
  function cerrarSesion() {
    LocalStorageServicio.clear()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-green-100 p-6">
      {/* Header */}
      <div className="flex justify-start items-center mb-6 gap-x-15">
        <span className="bg-[var(--color-dark-green)] w-15 h-8 items-center text-white px-2 py-1 rounded hover:bg-emerald-800 hover:text-gray-200 transition cursor-pointer">
            <Link to={"/historial"}>Volver</Link>
          </span>
        <h1 className="text-2xl font-bold">
          Valoración de los chats por: medico1@gmail.com
        </h1>
      </div>

      {/* Main content */}
      <div className="flex space-x-6">
        {/* Chat pane */}
        <div className="flex-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto p-4 flex flex-col">
          <div className="space-y-4 flex-grow overflow-auto">
            {valoracion.messages &&
              valoracion.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "usuario"
                      ? "self-start bg-green-200"
                      : "self-end bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
          </div>
        </div>

        {/* Valoraciones */}
        <div className="w-1/3 bg-white rounded-lg shadow p-6 flex flex-col justify-between h-[70vh]">
          <div className="space-y-6">
            {[
              { label: "Precisión diagnóstica", key: "precision" },
              { label: "Claridad textual", key: "claridad" },
              { label: "Fluidez conversacional", key: "utilidad_clínica" },
              { label: "Utilidad de las recomendaciones", key: "empatía" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="text-lg font-semibold text-green-700">
                  Valoración:{" "}
                  {valoracion.rating?.scores?.[key] ?? (
                    <span className="text-gray-400 italic">Sin valoración</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botones desactivados o eliminados */}
          <div className="mt-4 flex justify-end space-x-4">
            <button onClick={() => cerrarSesion()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Terminar Valoraciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleValoracion;
