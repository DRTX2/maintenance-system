import React,{ useState, useEffect } from "react";
import InformationPage from "../common/InformationPage/Page";


// import DeleteIcon from '@mui/icons-material/Delete';
// import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";

const columns = [
  { field: "cod_dis", label: "Código" },
  { field: "nom_dis", label: "Nombre" },
  { field: "tip_dis", label: "Tipo" },
];

function SuppliersPageContent() {
  return <InformationPage columns={columns}/>;
}


export default SuppliersPageContent;
