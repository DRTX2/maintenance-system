import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; 
import Suppliers from "./pages/Suppliers";

function Category() {
  return "Hola";
}

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Ruta para Dashboard */}
        <Route path="/suppliers" element={<Suppliers pathname="/suppliers" />}/>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
