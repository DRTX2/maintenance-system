import GenericManager from "../GenericManager";

const UserManager = () => {
  const apiConfig = {
    fetchAll: "/users",
    fetchOne: "/users",
    fetchSearch: "/users/search?term=",
    create: "/users",
    update: "/users",
    delete: "/users",
  };

  const defaultEntityState = {
    role: "",
    name: "",
    email: "",
    password: "",
  };

  //   En los modales
  const fields = [
    {
      key: "role",
      label: "Rol",
      type: "select",
      options: [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuario" },
      ],
    },
    { key: "name", label: "Nombre", type: "text" },
    { key: "email", label: "Correo", type: "text" },
    // Corregir.
    { key: "password", label: "Contraseña", type: "password" },
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
