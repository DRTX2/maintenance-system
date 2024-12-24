import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import SupplierMaganer from "../generic/implementations/SupplierManager";
import LocationManager from "../generic/implementations/LocationManager";
import UserManager from "../generic/implementations/UserManager";
import ResponsibleManager from "../generic/implementations/ResponsibleManager";
import IncomeManager from "../generic/implementations/IncomeManager";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "../utils/authService";

function DemoPageContent({ pathname }) {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  if (!decodedToken) {
    navigate("/");
    return null;
  }

  const renderContent = (pathname) => {
    switch (pathname) {
      case "/usuarios":
        return <UserManager />;
      case "/responsables":
        return <ResponsibleManager />;
      case "/proveedores":
        return <SupplierMaganer />;
      case "/ubicaciones":
        return <LocationManager />;
      case "/ingresos":
        return <IncomeManager />;
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
