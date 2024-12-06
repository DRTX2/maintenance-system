import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; 
import Suppliers from "./pages/Suppliers";

function Prueba() {
  return "Hola";
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Ruta para Dashboard */}
        {/* Puedes agregar más rutas si es necesario */}
        <Route path="/prueba" element={<Prueba />} />{" "}
        {/* Ruta para Dashboard */}
        <Route path="/suppliers" element={<Suppliers/>}/>
      </Routes>
    </Router>
  );
}

export default App;
