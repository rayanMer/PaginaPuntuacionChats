import { useEffect, useState } from "react";
import { Link } from "react-router";
import ServicioLecturaConversacion from "../services/ServicioLecturaConversacion";

const Historial = () => {
  const [valoraciones, setValoraciones] = useState([]);

  useEffect(() => {
    ServicioLecturaConversacion.obtenerValoracionesPorUsuario(
      "medico1@ejemplo.com"
    )
      // Más adelante se cambia el ejemplo por el usuario o email que esté loggeado
      .then((response) => {
        setValoraciones(response.data);
      })
      .catch((error) =>
        console.error("No se han encontrado valoraciones anteriores", error)
      );
  }, []);

  return (
    <div className="historial-container bg-[var(--color-light-green)] h-screen grid grid-rows-12">
      <div className="row-start-2 col-span-11 row-span-11 grid grid-rows-12">
        <div className="flex flex-row justify-start ml-15 gap-x-10">
          <span className="bg-[var(--color-dark-green)] w-15 h-8 items-center text-white px-2 py-1 rounded hover:bg-emerald-800 hover:text-gray-200 transition cursor-pointer">
            <Link to={"/"}>Volver</Link>
          </span>
          <h1 className="text-2xl font-bold">Página de historial de valoraciones</h1>
        </div>
        <div className="cards-container row-span-11 flex flex-wrap gap-10 ml-15">
          <div className="card-ejemplo bg-white rounded-md h-75 w-60 grid grid-rows-8">
            <div className="row-span-7">
              <img src="images/card.png" className="h-fit w-fit" />
            </div>
            <div className="row-span-1 row-start-8 bg-gray-300 items-center flex justify-center">
              <p>Ejemplo de fecha</p>
            </div>
          </div>
          {valoraciones.map((val, index) => (
            <Link to={`/valoracion/${val.id}`} key={index}>
              <div className="card-ejemplo bg-white rounded-md h-75 w-60 grid grid-rows-8">
                <div className="row-span-7">
                  <img
                    src="images/card.png"
                    className="h-fit w-fit"
                    alt={val._id}
                  />
                </div>
                <div className="row-span-1 row-start-8 bg-gray-300 items-center flex justify-center">
                  <p> {val.rating.timestamp} </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Historial;
