import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SuppliersPageContent({ pathname }) {
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
      
    </Box>
  );
}

SuppliersPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default SuppliersPageContent;
