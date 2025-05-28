import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ServicioLecturaConversacion from "../services/ServicioLecturaConversacion";
import PanelConversacion from "./PaginaValoraciones/PanelConversacion";

const DetalleValoracion = () => {
  const { id } = useParams();

  const [valoracion, setValoracion] = useState([]);
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    ServicioLecturaConversacion.getConversacionPorId(id)
      .then((response) => {
        console.log(response.data)
        setValoracion(response.data);
        const data = response.data[0]; // accedemos al primer y único objeto
        setMensajes(data.messages)
      })
      .catch((error) =>
        console.error("No se ha encontrado la valoración", error)
      );
  }, []);

  const data = valoracion[0]; // accedemos al primer y único objeto


  return (
    <div className="min-h-screen bg-green-100 p-6">
      {/* Header */}
      <div className="flex justify-start items-center mb-6 gap-x-6">
        <Link
          to="/historial"
          className="bg-[var(--color-dark-green)] w-24 h-8 flex items-center justify-center text-white px-3 py-1 rounded hover:bg-emerald-800 hover:text-gray-200 transition cursor-pointer"
        >
          Volver
        </Link>
        <h1 className="text-2xl font-bold">
          Valoración de los chats por: {data?.doctorEmail || "Desconocido"}
        </h1>
      </div>

      {/* Main content */}
      <div className="flex space-x-6">
        {/* Chat messages */}
        <div className="flex flex-col lg:flex-row py-5 px-10 gap-15 justify-center max-h-133">
            <PanelConversacion mensajes={mensajes} />
          </div>

        {/* Valoraciones */}
        <div className="w-1/3 bg-white rounded-lg shadow p-6 flex flex-col justify-between h-[70vh]">
          <div className="space-y-6">
            {[
              { label: "Precisión diagnóstica", key: "metric_1" },
              { label: "Claridad textual", key: "metric_2" },
              { label: "Fluidez conversacional", key: "metric_3" },
              { label: "Utilidad de las recomendaciones", key: "metric_4" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="text-lg font-semibold text-green-700">
                  Valoración:{" "}
                  {data?.metrics?.[key] ?? (
                    <span className="text-gray-400 italic">Sin valoración</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleValoracion;
