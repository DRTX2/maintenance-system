import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Category from "./categories/Category";

function DemoPageContent({ pathname }) {
  const renderContent = (pathname) => {
    switch (pathname) {
      case "/usuarios":
        return <div>Contenido de Usuarios</div>;
      case "/proveedores":
        return <div>Contenido de Proveedores</div>;
      case "/ubicaciones":
        return <div>Contenido para Ubicaciones</div>;
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
      <h1>Ruta actual: {pathname}</h1>
      {renderContent(pathname)}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DemoPageContent;
