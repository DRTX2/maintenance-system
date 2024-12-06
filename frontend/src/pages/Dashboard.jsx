import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import DevicesIcon from "@mui/icons-material/Devices";
import BuildIcon from "@mui/icons-material/Build";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";

// Navegación
const NAVIGATION = [
  {
    segment: "usuarios",
    title: "Usuarios",
    icon: <PersonIcon />, // Representa usuarios/personas
  },
  {
    segment: "proveedores",
    title: "Proveedores",
    icon: <LocalShippingIcon />, // Relacionado con proveedores y envíos
  },
  {
    segment: "ubicaciones",
    title: "Ubicaciones",
    icon: <PlaceIcon />, // Representa ubicaciones geográficas
  },
  {
    segment: "dispositivos",
    title: "Dispositivos",
    icon: <DevicesIcon />, // Relacionado con dispositivos electrónicos
  },
  {
    segment: "componentes",
    title: "Componentes",
    icon: <BuildIcon />, // Herramientas/partes de algo más grande
  },
  {
    segment: "ingresos",
    title: "Ingresos",
    icon: <AttachMoneyIcon />, // Relacionado con dinero o finanzas
  },
  {
    segment: "activos",
    title: "Activos",
    icon: <InventoryIcon />, // Representa bienes o inventario
  },
  {
    segment: "mantenimientos",
    title: "Mantenimientos",
    icon: <EngineeringIcon />, // Relacionado con reparaciones o mantenimiento
  },
  {
    kind: "divider",
  },

  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
];

// Tema
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Contenido del Dashboard
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Componente Principal

function Dashboard(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
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
