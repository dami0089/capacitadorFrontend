import { Outlet, Navigate } from "react-router-dom";

import { DashboardNavbar, Footer } from "@/widgets/layout";

import { useMaterialTailwindController } from "@/context";
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/Cargando";

const RutaProtegida = () => {
  return (
    <>
      <div
        className="flex flex-col bg-inherit bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('img/fondo.webp')`,
        }}
      >
        {/* Navbar en la parte superior */}
        <DashboardNavbar />

        {/* Contenedor principal que incluye el componente Outlet */}
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>

        {/* Footer en la parte inferior */}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>

      <Cargando />
    </>
  );
};

export default RutaProtegida;
