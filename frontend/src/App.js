import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./components/login/LogIn";
import PrivateRoute from "./components/protected/PrivateRoute";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
