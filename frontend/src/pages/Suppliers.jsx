import React from "react";
import PropTypes from "prop-types";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { NAVIGATION } from "../components/NavigationConfig";
import { demoTheme } from "../components/Theme";
import SuppliersPageContent from "../components/SuppliersPageContent";

function Suppliers({ window }) {
  const router = useDemoRouter("/suppliers");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <SuppliersPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

Suppliers.propTypes = {
  window: PropTypes.func,
};

export default Suppliers;
