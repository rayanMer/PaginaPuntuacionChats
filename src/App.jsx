import { AuthProvider } from "./services/login/AuthProvider";
import LoginPage from "./components/Login";
import { Routes, Route, useLocation } from "react-router";
import RutasProtegidas from "./services/login/RutasProtegidas";
import PaginaValoraciones from "./components/PaginaValoraciones";
import PaginaValoracionesTest from "./components/PaginaValoraciones/PaginaValoracionesTest";
import Historial from "./components/Historial";
import DetalleValoracion from "./components/DetalleValoracion";
import Header from "./components/Header"
import Pagina404 from "./components/Pagina404";
import HistorialTest from "./components/PaginaValoraciones/HistorialTest";

function App() {
    const location = useLocation();
    const mostrarHeader = location.pathname !== "/login"

  return (
    <AuthProvider>
      {mostrarHeader && <Header/>}
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RutasProtegidas>
                <PaginaValoraciones />
              </RutasProtegidas> 
            }
          />
          {/* Borrar una vez terminado PaginaValoraciones*/}
          <Route
            path="/test"
            element={
              <RutasProtegidas>
                <PaginaValoracionesTest />
              </RutasProtegidas> 
          }
          />
          <Route
            path="/historial"
            element={
              <RutasProtegidas>
                <Historial />
              </RutasProtegidas>
            }
          />
          <Route
            path="/valoracion/:id"
            element={
              <RutasProtegidas>
                <DetalleValoracion />
              </RutasProtegidas>
            }
          />
          <Route
            path="/historialtest"
            element={
              <RutasProtegidas>
                <HistorialTest />
              </RutasProtegidas> 
            }
          />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
