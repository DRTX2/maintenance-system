import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Importa el componente Dashboard

function Category() {
  return "Hola";
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
