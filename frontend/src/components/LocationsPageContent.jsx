import React,{ useState, useEffect } from "react";
import InformationPage from "../common/InformationPage/Page";


const columns = [
    { field: "codigo", label: "Email" },
    { field: "nombre", label: "Nombre" }
];

function LocationsPageContent() {
  return <InformationPage columns={columns} section="locations" />;
}


export default LocationsPageContent;
