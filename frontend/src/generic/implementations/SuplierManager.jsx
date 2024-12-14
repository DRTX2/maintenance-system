import GenericManager from "../GenericManager";

const SuplierManager = () => {
  const apiConfig = {
    fetchAll: "/suppliers",
    fetchOne: "/suppliers",
    fetchSearch: "/suppliers/search?term=",
    create: "/suppliers",
    update: "/suppliers",
    delete: "/suppliers",
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
      entityNamePlural="Proveedores"
      entityNameSingular="Proveedor"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default SuplierManager;
