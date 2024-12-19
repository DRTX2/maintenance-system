import GenericManager from "../GenericManager";

const ResponsibleManager = () => {
  const apiConfig = {
    fetchAll: "/",
    fetchOne: "/",
    fetchSearch: "//search?term=",
    create: "/",
    update: "/",
    delete: "/",
  };

  const defaultEntityState = {
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
  };

  //   En los modales
  const fields = [
    {
      key: "tipo",
      label: "Tipo",
      type: "select",
      options: [
        { value: "interno", label: "Interno" },
        { value: "externo", label: "Externo" },
      ],
    },
    { key: "cedula", label: "Cedula", type: "text" },
    { key: "name", label: "Nombre", type: "text" },
    { key: "apellido", label: "Apellido", type: "text" },
    { key: "email", label: "Correo", type: "text" },
    { key: "telefono", label: "Telefono", type: "text" },
  ];

  //   En la tabla
  const columns = [
    { key: "cedula", label: "Cedula" },
    { key: "nombre", label: "Nombre" },
    { key: "nombre", label: "Apellido" },
    { key: "correo", label: "Correo" },
    { key: "telefono", label: "Telefono" },
  ];

  const message = "nombre";

  const searchBy = "cedula";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityNamePlural="Responsables"
      entityNameSingular="Responsable"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default ResponsibleManager;
