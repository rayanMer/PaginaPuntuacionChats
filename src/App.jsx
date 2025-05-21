import { AuthProvider } from "./services/login/AuthProvider";
import LoginPage from "./components/Login";
import { Routes, Route } from "react-router";
import RutasProtegidas from "./services/login/RutasProtegidas";
import PaginaValoraciones from "./components/PaginaValoraciones";
import PaginaValoracionesTest from "./components/PaginaValoracionesTest";
import Historial from "./components/Historial";
import DetalleValoracion from "./components/DetalleValoracion";

function App() {
  return (
    <AuthProvider>
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
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
