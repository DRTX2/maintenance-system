import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="inherit" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton({ label }) {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      {label}
    </Button>
  );
}

function Title({ text }) {
  return <Typography variant="h5">{text}</Typography>;
}

function SignUpForm({ onBackToLogin }) {
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
        alert(`Registered: ${formData.get("email")}`);
      }}
    >
      <Title text="Register" />
      <TextField name="name" label="Name" size="small" fullWidth required />
      <CustomEmailField />
      <CustomPasswordField />
      <CustomButton label="Sign Up" />
      <Typography variant="body2" textAlign="center">
        Already have an account?{" "}
        <Link href="#" onClick={onBackToLogin}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
}

export default function SlotsSignIn() {
  const theme = useTheme();
  const [showRegister, setShowRegister] = React.useState(false);

  return (
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
          <Title text="Login" />
          <CustomEmailField />
          <CustomPasswordField />
          <CustomButton label="Log In" />
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link href="#" onClick={() => setShowRegister(true)}>
              Sign up
            </Link>
          </Typography>
        </Box>
      )}
    </AppProvider>
  );
}
