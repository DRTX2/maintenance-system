import axiosInstance from "../../utils/api";
import React, { useEffect, useState } from "react";
import GenericManager from "../GenericManager";
import { toast } from "react-toastify";

const IncomeManager = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get("/suppliers");
        setSuppliers(response.data.results);
      } catch (error) {
        toast.error("Error al cargar los proveedores");
      }
    };

    fetchSuppliers();
  }, []);

  console.log(suppliers);

  const apiConfig = {
    fetchAll: "/incomes",
    fetchOne: "/incomes",
    fetchSearch: "/incomes/search?term=",
    create: "/incomes",
    update: "/incomes",
    delete: "/incomes",
  };

  const defaultEntityState = {
    id_ing: "",
    fec_ing: "",
    est_inc: "",
    id_sup_inc: "",
  };

  const results =
    suppliers.length > 0
      ? suppliers.map((supplier) => ({
          value: supplier.id,
          label: supplier.nam_sup,
        }))
      : [{ value: "", label: "Cargando proveedores..." }];

  const fields = [
    { key: "id_ing", label: "Código", type: "text" },
    { key: "est_inc", label: "Estado", type: "text" },
    {
      key: "id_sup_inc",
      label: "Proveedor",
      type: "select",
      options: results,
    },
  ];

  const columns = [
    { key: "id_ing", label: "Código" },
    { key: "fec_ing", label: "Fecha" },
    { key: "est_inc", label: "Estado" },
    { key: "id_sup_inc", label: "Proveedor" },
  ];

  const message = "id_ing";

  const searchBy = "código";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityNamePlural="Ingresos"
      entityNameSingular="Ingreso"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default IncomeManager;
