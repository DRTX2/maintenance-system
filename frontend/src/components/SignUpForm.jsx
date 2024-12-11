import React, { useState } from "react";
import { Box, TextField, Typography, Link } from "@mui/material";
import CustomEmailField from "./CustomEmailField";
import CustomPasswordField from "./CustomPasswordField";
import CustomButton from "./CustomButton";
import { BASE_API } from "../utils/configs";
import axios from "axios";

axios.defaults.withCredentials = true;

function SignUpForm({ onBackToLogin }) {
  const [error, setError] = useState(""); 

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post(`${BASE_API}/register`, userData);
      // Almacena el token si es necesario
      const { token } = response.data;
      localStorage.setItem("jwt_token", token);
      console.log("User registered:", response.data);
    } catch (err) {
      setError("Error registering the user.");
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "auto",
        marginTop: "10%",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData);
        const user = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        };
        handleRegister(user);
      }}
    >
      <Typography variant="h5">Register</Typography>
      <TextField name="name" label="Name" size="small" fullWidth required />
      <CustomEmailField />
      <CustomPasswordField />
      <CustomButton label="Sign Up" />
      {error && (
        <Typography color="error" variant="body2" textAlign="center">
          {error}
        </Typography>
      )}
      <Typography variant="body2" textAlign="center">
        Already have an account?{" "}
        <Link href="#" onClick={onBackToLogin}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
}

export default SignUpForm;
