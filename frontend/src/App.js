import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlotsSignIn from "./components/SlotsSignIn";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
      <Router>
        <Routes>
          <Route path="/" element={<SlotsSignIn />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
