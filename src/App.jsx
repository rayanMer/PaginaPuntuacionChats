import { AuthProvider } from "./services/login/AuthProvider";
import LoginPage from "./components/Login";
import { Routes, Route } from "react-router";
import RutasProtegidas from "./services/login/RutasProtegidas";
import PaginaValoraciones from "./components/PaginaValoraciones";
import Historial from "./components/Historial";

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
            
                <PaginaValoraciones />
              
            }
          />

          <Route
            path="/historial"
            element={
            
                <Historial />
              
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
