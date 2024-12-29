import React, { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { navigation } from "../components/NavigationConfig";
import { demoTheme } from "../components/Theme";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";
import { getDecodedToken, removeToken } from "../utils/authService";
import Box from "@mui/material/Box";

function Dashboard({ window }) {
  const navigate = useNavigate();

  const [session, setSession] = useState(() => {
    const decodedToken = getDecodedToken();
    if (!decodedToken) {
      navigate("/");
      return null;
    }

    return {
      user: {
        name: decodedToken.name,
        email: decodedToken.email,
      },
    };
  });

  const authentication = {
    signOut: async () => {
      await axiosInstance.post("/logout");
      removeToken();
      setSession(null);
      navigate("/");
    },
  };

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={navigation}
      theme={demoTheme}
      branding={{
        homeUrl: "dashboard",
        logo: <EngineeringIcon style={{ color: "white", fontSize: 35 }} />,
        title: (
          <span style={{ color: "white" }}>Sistema De Mantenimientos</span>
        ),
      }}
    >
      <DashboardLayout>
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default Dashboard;
