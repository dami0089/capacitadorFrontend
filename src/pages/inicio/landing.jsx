// App.jsx
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500); // Simula el delay para que la animación se vea al cargar
  }, []);

  const handleEntrenador = (e) => {
    e.preventDefault();
    navigate("/entrenador");
  };

  const handleCapacitador = (e) => {
    e.preventDefault();
    navigate("/capacitador");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header titulo={"Demo Inteligencia Artificial para las ventas"} />

      {/* Contenido principal */}
      <div
        className="flex flex-grow items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/img/vendedores1.jpeg')` }} // Usa el path relativo a la carpeta 'public'
      >
        <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
          <div
            className={`transform transition-transform duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
            onClick={(e) => handleCapacitador(e)}
          >
            <div className="flex h-[100px] w-[300px] items-center justify-center rounded-lg bg-white text-xl font-bold shadow-lg hover:scale-95 hover:cursor-pointer">
              Capacitador
            </div>
          </div>
          <div
            className={`transform transition-transform delay-300 duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <div
              className="hover:size-110 flex h-[100px] w-[300px] items-center justify-center rounded-lg bg-white text-xl font-bold shadow-lg hover:scale-95 hover:cursor-pointer"
              onClick={(e) => handleEntrenador(e)}
            >
              Entrenador
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
