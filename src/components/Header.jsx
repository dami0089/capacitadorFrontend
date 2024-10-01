// Header.jsx
import React from "react";

const Header = ({ titulo }) => {
  return (
    <header className="absolute left-0 top-0 z-10 flex w-full items-center justify-between p-4">
      {/* Logo */}
      <div className="flex items-center ">
        <img
          src="/img/logodata.jpeg" // Ruta relativa a la carpeta 'public'
          alt="Logo"
          className="h-20 w-32 rounded-xl"
        />
      </div>
      {/* Título */}
      <div className="flex items-center rounded-xl bg-black bg-opacity-75 p-6 shadow-2xl shadow-white">
        <h1 className="text-3xl font-bold text-white">{titulo}</h1>
      </div>
      {/* Placeholder para mantener el espacio en la derecha */}
      <div className="w-10"></div>
    </header>
  );
};

export default Header;
