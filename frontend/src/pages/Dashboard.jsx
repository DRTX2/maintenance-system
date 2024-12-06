import React from "react";
import PropTypes from "prop-types";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { NAVIGATION } from "../components/NavigationConfig";
import { demoTheme } from "../components/Theme";
import DemoPageContent from "../components/DemoPageContent";
import EngineeringIcon from "@mui/icons-material/Engineering";
function Dashboard({ window }) {
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
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

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
