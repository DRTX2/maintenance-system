import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import SuplierMaganer from "../generic/implementations/SuplierManager";
import LocationManager from "../generic/implementations/LocationManager";
import UserManager from "../generic/implementations/UserManager";
import ResponsibleManager from "../generic/implementations/ResponsibleManager";

function DemoPageContent({ pathname }) {
  const renderContent = (pathname) => {
    switch (pathname) {
      case "/usuarios":
        return <UserManager />;
      case "/responsables":
        return <ResponsibleManager />;
      case "/proveedores":
        return <SuplierMaganer />;
      case "/ubicaciones":
        return <LocationManager />;
      case "/ingresos":
        return <div>Ingresos</div>;
      case "/activos":
        return <div>Activos</div>;

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
