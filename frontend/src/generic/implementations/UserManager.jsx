import GenericManager from "../GenericManager";

const UserManager = () => {
  const apiConfig = {
    fetchAll: "/users",
    fetchOne: "/users",
    fetchSearch: "/locations/search?term=",
    create: "/users",
    update: "/users",
    delete: "/users",
  };

  const defaultEntityState = {
    name: "",
    email: "",
    role: "",
  };

  //   En los modales
  const fields = [
    {
      key: "role",
      label: "Rol",
      type: "select",
      options: [
        { value: "admin", label: "Adminitrador" },
        { value: "user", label: "Usuario" },
      ],
    },
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo" },
  ];

  //   En la tabla
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "role", label: "Rol" },
  ];

  const message = "name";

  const searchBy = "correo";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityNamePlural="Usuarios"
      entityNameSingular="Usuario"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default UserManager;
