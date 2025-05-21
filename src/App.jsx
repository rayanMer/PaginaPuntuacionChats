import { AuthProvider } from "./services/login/AuthProvider";
import LoginPage from "./components/Login";
import { Routes, Route } from "react-router";
import RutasProtegidas from "./services/login/RutasProtegidas";
import PaginaValoraciones from "./components/PaginaValoraciones";
import Historial from "./components/Historial";
import DetalleValoracion from "./components/DetalleValoracion";
import Pagina404 from "./components/Pagina404";

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
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
