import { AuthProvider } from "./services/login/AuthProvider";
import LoginPage from "./components/Login";
import { Routes, Route, useLocation } from "react-router";
import RutasProtegidas from "./services/login/RutasProtegidas";
import PaginaValoraciones from "./components/PaginaValoraciones";
import Historial from "./components/Historial";
import DetalleValoracion from "./components/DetalleValoracion";
import Header from "./components/Header";
import Pagina404 from "./components/Pagina404";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
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
          </Route>

          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
