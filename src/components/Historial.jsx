import { useEffect, useState } from "react";
import ServicioLecturaConversacion from "../services/ServicioLecturaConversacion";
import { Link } from "react-router";

const HistorialTest = () => {
  const usuario = String(localStorage.getItem("email")).trim();
  const usuarioClean = usuario.replace(/^"|"$/g, "").trim().toLowerCase();

  const [valoraciones, setValoraciones] = useState([]);

  useEffect(() => {
    ServicioLecturaConversacion.obtenerConversacionesTest()
      .then((response) => {
        const filtro = response.data.filter(
          (conversacion) => conversacion.doctorEmail === usuarioClean
        );
        setValoraciones(filtro);
      })
      .catch((error) => {
        console.error("No se han podido obtener las valoraciones", error);
      });
  }, []);

  return (
    <div className="historial-container bg-[var(--color-light-green)] min-h-screen grid grid-rows-12">
      <div className="row-start-2 col-span-11 row-span-11 grid grid-rows-12">
        <div className="flex flex-row justify-start ml-15 gap-x-10">
          <span className="bg-[var(--color-dark-green)] w-15 h-8 items-center text-white px-2 py-1 rounded hover:bg-emerald-800 hover:text-gray-200 transition cursor-pointer">
            <Link to={"/"}>Volver</Link>
          </span>
          <h1 className="text-2xl font-bold">
            Página de historial de valoraciones
          </h1>
        </div>
        <div className="cards-container row-span-11 flex flex-wrap gap-10 ml-15">
          
          {valoraciones.map((val, index) => (
            <Link to={`/valoracion/${val.id}`} key={index}>
              <div className="card-ejemplo bg-white rounded-md h-75 w-60 grid grid-rows-8">
                <div className="row-span-7">
                  <img
                    src="images/card.png"
                    className="h-fit w-fit"
                    alt={val.id}
                  />
                </div>
                <div className="row-span-1 row-start-8 bg-gray-300 items-center flex justify-center">
                  <p>
                    {" "}
                    {val.doctorEmail} - {val.id}{" "}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorialTest;
