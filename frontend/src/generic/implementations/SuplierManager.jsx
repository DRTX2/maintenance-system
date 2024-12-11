import GenericManager from "../GenericManager";

const SuplierManager = () => {
  const apiConfig = {
    fetchAll: "http://127.0.0.1:8000/api/suppliers",
    fetchOne: "http://127.0.0.1:8000/api/suppliers",
    fetchSearch: "http://127.0.0.1:8000/api/suppliers/search?term=",
    create: "http://127.0.0.1:8000/api/suppliers",
    update: "http://127.0.0.1:8000/api/suppliers",
    delete: "http://127.0.0.1:8000/api/suppliers",
  };

  const defaultEntityState = {
    id_num_sup: "",
    nam_sup: "",
    ema_sup: "",
    pho_sup: "",
  };

  const fields = [
    { key: "id_num_sup", label: "Cédula" },
    { key: "nam_sup", label: "Nombre" },
    { key: "ema_sup", label: "Correo" },
    { key: "pho_sup", label: "Telefono" },
  ];

  const columns = [
    { key: "id_num_sup", label: "Cédula" },
    { key: "nam_sup", label: "Nombre" },
    { key: "ema_sup", label: "Correo" },
    { key: "pho_sup", label: "Telefono" },
  ];

  const message = "nam_sup";
  const searchBy = "cedula";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityName="Proveedores"
      entityNameAdd="Proveedor"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default SuplierManager;
