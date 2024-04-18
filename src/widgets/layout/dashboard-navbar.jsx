import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Input,
  Card,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BuildingLibraryIcon,
  PlusIcon,
  PlusCircleIcon,
  HomeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";

import useAuth from "@/hooks/useAuth";

import { useState } from "react";
import useEmpresas from "@/hooks/useEmpresas";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { cerrarSesionAuth, auth } = useAuth();
  const {
    buscar,
    setBuscar,
    busqueda,
    handleModalNuevoCasoRol,
    handleModalNuevoCasoSuperAdmin,
  } = useEmpresas();
  const navigate = useNavigate();

  const handleclose = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  const [seleccion, setSeleccion] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await busqueda(buscar);
    navigate("/inicio/buscar");
  };

  const handleNuevoCaso = () => {
    handleModalNuevoCasoRol();
  };

  const handleNuevoCasoSuperAdmin = () => {
    handleModalNuevoCasoSuperAdmin();
  };

  const handleNuevoCasoRoles = () => {
    handleModalNuevoCasoRol();
  };

  const handleInicio = (e) => {
    e.preventDefault();
    navigate("/inicio");
  };

  const handleEntidades = (e) => {
    e.preventDefault();
    navigate("/entidades");
  };

  const handleUsuarios = (e) => {
    e.preventDefault();
    navigate("/usuarios");
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={` rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-0 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className=" flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div>
          <img
            src={"img/logodata.jpeg"}
            alt={"data-predictor-logo"}
            className="w-100 ml-10 mt-10 h-20 rounded-lg opacity-60"
          />
        </div>
        <div className="wd flex items-center">
          <div></div>

          {/* <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                onClick={handleclose}
                color="blue-gray"
              >
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={handleclose}
                />
              </IconButton>
            </MenuHandler>
          </Menu> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
