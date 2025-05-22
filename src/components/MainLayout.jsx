import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  const location = useLocation();
  const ocultarHeaderEn = ["/login"];

  const mostrarHeader = !ocultarHeaderEn.includes(location.pathname);

  return (
    <>
      {mostrarHeader && <Header />}
      <Outlet />
    </>
  );
};

export default MainLayout;
