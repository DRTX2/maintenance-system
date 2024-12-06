import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Importa el componente Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Ruta para Dashboard */}
        {/* Puedes agregar más rutas si es necesario */}
      </Routes>
    </Router>
  );
}

export default App;
