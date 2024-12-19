import React, { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { navigation } from "../components/NavigationConfig";
import { demoTheme } from "../components/Theme";
import DemoPageContent from "../components/DemoPageContent";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";

function Dashboard({ window }) {
  const navigate = useNavigate();

  // Obteniendo el token
  const token = localStorage.getItem("jwt_token");
  const [session, setSession] = useState(() => {
    if (token) {
      try {
        // Decodificando el token
        const data = jwtDecode(token);

        // Devolviendo la información para la sesión
        return {
          user: {
            name: data.name,
            email: data.email,
          },
        };
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  });

  const authentication = {
    signOut: async () => {
      await axiosInstance.post("/logout");
      localStorage.removeItem("jwt_token");
      setSession(null);
      navigate("/");
    },
  };

  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={navigation}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <EngineeringIcon style={{ color: "white", fontSize: 35 }} />,
        title: (
          <span style={{ color: "white" }}>Sistema De Mantenimientos</span>
        ),
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Dashboard;
