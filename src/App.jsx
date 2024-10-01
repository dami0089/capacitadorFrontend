import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/inicio";

import useAuth from "./hooks/useAuth";
import RutaProtegida from "./layouts/RutaProtegida";
import Contact from "./components/Contact";
import Landing from "./pages/inicio/landing";
import Capacitador from "./pages/inicio/capacitador";
import PDFViewer from "./pages/inicio/verPdf";
import Consultas from "./pages/inicio/consultas";
import MultipleChoice from "./pages/inicio/multipleChoice";

function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
       */}
      <Route path="/" element={<Landing />}></Route>
      <Route path="/entrenador" element={<RutaProtegida />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/capacitador" element={<Capacitador />}></Route>

      <Route path="/ver-pdf" element={<PDFViewer />}></Route>

      <Route path="/consultas" element={<Consultas />}></Route>

      <Route path="/multiple-choice" element={<MultipleChoice />}></Route>

      <Route path="/contacto" element={<RutaProtegida />}>
        <Route index element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
