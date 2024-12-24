import React, { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { navigation } from "../components/NavigationConfig";
import { demoTheme } from "../components/Theme";
import DemoPageContent from "../components/DemoPageContent";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";
import { getDecodedToken, removeToken } from "../utils/authService";

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
