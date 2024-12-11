import React, { useState } from "react";
import { Box, Typography, Link, TextField, Snackbar } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import CustomEmailField from "../components/CustomEmailField";
import CustomPasswordField from "../components/CustomPasswordField";
import CustomButton from "../components/CustomButton";
import SignUpForm from "../components/SignUpForm";
import { BASE_API } from "../utils/configs";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function SlotsSignIn() {
  const theme = useTheme();
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) throw new Error("Campos vacios");
      console.log(email);
      console.log(password);

      const response = await axios.post(`${BASE_API}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("jwt_token", token);
      console.log("Logged in successfully:", response.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or server error.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "0 200px" }}>
      <AppProvider theme={theme}>
        {showRegister ? (
          <SignUpForm onBackToLogin={() => setShowRegister(false)} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            <Typography variant="h5">Login</Typography>
            {/* Campo de correo electrónico */}
            <CustomEmailField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Campo de contraseña */}
            <CustomPasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Botón de Login */}
            <CustomButton label="Log In" onClick={handleLogin} />
            {/* Enlace para ir al registro */}
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link href="#" onClick={() => setShowRegister(true)}>
                Sign up
              </Link>
            </Typography>
          </Box>
        )}

        {/* Snackbar para mostrar el error */}
        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => setError("")}
            message={error}
          />
        )}
      </AppProvider>
    </div>
  );
}
