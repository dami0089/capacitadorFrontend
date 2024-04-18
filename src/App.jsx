import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/inicio";

import useAuth from "./hooks/useAuth";
import RutaProtegida from "./layouts/RutaProtegida";
import Contact from "./components/Contact";

function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
       */}
      <Route path="/" element={<RutaProtegida />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/contacto" element={<RutaProtegida />}>
        <Route index element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
