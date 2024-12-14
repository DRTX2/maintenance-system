import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import { BASE_API } from "../../utils/configs";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MaintenanceIcon from "@mui/icons-material/Build";

import CustomEmailField from "./CustomEmailField";
import CustomPasswordField from "./CustomPasswordField";
import CustomButton from "./CustomButton";
import axiosInstance from "../../utils/api";
import { validateField, validateFields } from "../../utils/validations";
import { toast } from "react-toastify";

const LogIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [unkow, setUnkow] = useState({
    ema_log: "",
    pas_log: "",
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (key, value) => {
    setUnkow((prevunkow) => ({ ...prevunkow, [key]: value }));

    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMessage }));
  };

  const validateAll = () => {
    const validationErrors = validateFields(unkow, [
      { key: "ema_pas" },
      { key: "pas_log" },
    ]);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/login", {
        email: unkow.ema_log,
        password: unkow.pas_log,
      });
      const { token } = response.data;
      localStorage.setItem("jwt_token", token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error inesperado");
    }
  };

  const go = () => {
    if (validateAll()) {
      handleLogin();
    }
  };

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "center", // Centrar verticalmente
          minHeight: "100vh", // Altura completa de la pantalla
          padding: "16px", // Espaciado interno
          boxSizing: "border-box", // Incluir padding en el tamaño total
        }}
      >
        <Box sx={{ marginBottom: "40px" }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 56,
                height: 56,
              }}
            >
              <MaintenanceIcon fontSize="large" />
            </Avatar>
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Gestión de Mantenimientos
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "16px", // Bordes más redondeados
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Sombra más destacada
            transition: "transform 0.3s, box-shadow 0.3s", // Animación
            "&:hover": {
              transform: "scale(1.02)", // Escala al pasar el ratón
              boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "30px", textAlign: "center" }}
          >
            Iniciar sesión
          </Typography>
          {/* Campo de correo electrónico */}
          <CustomEmailField
            value={unkow.ema_log}
            onChange={(e) => handleFieldChange("ema_log", e.target.value)}
            errors={errors}
          />
          {/* Campo de contraseña */}
          <CustomPasswordField
            value={unkow.pas_log}
            onChange={(e) => handleFieldChange("pas_log", e.target.value)}
            errors={errors}
          />
          {/* Botón de Login */}
          <CustomButton label="Iniciar sesión" onClick={go} />
        </Box>
      </Box>
    </AppProvider>
  );
};

export default LogIn;
