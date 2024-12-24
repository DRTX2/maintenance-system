import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./components/login/LogIn";
import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
        limit={1}
        position="top-right"
      />
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
