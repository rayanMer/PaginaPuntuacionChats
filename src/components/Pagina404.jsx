import { Link } from "react-router-dom";

const Pagina404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center">
        <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Lo sentimos, no encontramos esta página.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default Pagina404;
