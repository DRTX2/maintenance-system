import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Category from "./categories/Category";
import SuppliersPageContent from "./SuppliersPageContent";
import LocationsPageContent from "./LocationsPageContent";

function DemoPageContent({ pathname }) {
  const renderContent = (pathname) => {
    switch (pathname) {
      case "/usuarios":
        return <div>Contenido de Usuarios</div>;
      case "/proveedores":
        return <SuppliersPageContent/>;
      case "/ubicaciones":
        return <LocationsPageContent/>;
      case "/dispositivos":
        return <Category />;
      default:
        return <div>Bienvenido al Dashboard</div>;
    }
  };

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
      {renderContent(pathname)}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DemoPageContent;
