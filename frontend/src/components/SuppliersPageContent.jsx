import React,{ useState, useEffect } from "react";
import InformationPage from "../common/InformationPage/Page";
import axios from "axios";

const columns = [
  { field: "nombre", label: "Nombre" },
  { field: "email", label: "Email" },
  { field: "telefono", label: "Teléfono" },
];

function SuppliersPageContent() {
  return <InformationPage columns={columns} section="suppliers" />;
}


export default SuppliersPageContent;
