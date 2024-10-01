import React from "react";
import { Button } from "@material-tailwind/react";
import { BackspaceIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { DashboardNavbar, Footer } from "@/widgets/layout";
import useEmpresas from "@/hooks/useEmpresas";
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/Cargando";
import Header from "@/components/Header";

export function Consultas() {
  const { resModulo, responder, consulta, setConsulta, setResModulo } =
    useEmpresas();

  const { handleCargando } = useAuth();

  const enviarConsulta = async (e) => {
    e.preventDefault();
    handleCargando();
    await responder(consulta);
    handleCargando();
  };

  const borrarTodo = async (e) => {
    e.preventDefault();
    setConsulta("");
    setResModulo("");
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />
        <div
          className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('img/vendedores2.jpeg')`,
          }}
        >
          {/* <div className="flex-shrink-0">
          <DashboardNavbar />
        </div> */}
          <div className="flex w-full flex-grow items-center justify-center">
            <div
              className=" container h-full  max-w-6xl rounded bg-white p-6 text-center shadow-2xl shadow-gray-900 drop-shadow-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              <h4 className="shadow-l  mb-2 text-xl font-bold uppercase">
                Modulo de consultas
              </h4>
              <div className="input-group relative mb-3 flex items-center">
                <input
                  type="text"
                  className="form-control mt-1 h-10 w-full rounded-xl border border-black p-2 pr-10" // Aumenta el padding a la derecha para el ícono de borrado
                  placeholder="Ingrese su pregunta"
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      enviarConsulta(e);
                    }
                  }}
                />
                {resModulo && (
                  <Button
                    className="btn btn-primary ml-2 bg-gray-700 text-white" // Se agrega margen a la izquierda
                    type="button"
                    onClick={(e) => borrarTodo(e)}
                  >
                    <BackspaceIcon className="h-6 w-6" />
                  </Button>
                )}
                <div className="input-group-append">
                  <Button
                    className="btn btn-primary ml-2 bg-gray-700" // Se agrega margen a la izquierda
                    type="button"
                    onClick={(e) => enviarConsulta(e)}
                  >
                    <PaperAirplaneIcon className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              <textarea
                className="form-control w-full rounded-xl border border-black p-3 opacity-80 hover:cursor-pointer"
                rows="16"
                value={resModulo}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <Cargando />
    </>
  );
}

export default Consultas;
