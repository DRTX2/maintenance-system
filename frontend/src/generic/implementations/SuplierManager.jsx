import GenericManager from "../GenericManager";

const SuplierManager = () => {
  const apiConfig = {
    fetchAll: "http://127.0.0.1:8000/api/suppliers",
    fetchOne: "http://127.0.0.1:8000/api/suppliers",
    create: "http://127.0.0.1:8000/api/suppliers",
    update: "http://127.0.0.1:8000/api/suppliers",
    delete: "http://127.0.0.1:8000/api/suppliers",
  };

  const defaultEntityState = {
    nam_sup: "",
    ema_sup: "",
    pho_sup: "",
  };

  const fields = [
    { key: "nam_sup", label: "Nombre" },
    { key: "ema_sup", label: "Correo" },
    { key: "pho_sup", label: "Telefono" },
  ];

  const columns = [
    { key: "nam_sup", label: "Nombre" },
    { key: "ema_sup", label: "Correo" },
    { key: "pho_sup", label: "Telefono" },
  ];

  const message = "nam_sup";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityName="Proveedores"
      entityNameAdd="Proveedor"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
    />
  );
};

export default SuplierManager;
