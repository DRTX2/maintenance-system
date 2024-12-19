import GenericManager from "../GenericManager";

const UserManager = () => {
  const apiConfig = {};

  const defaultEntityState = {
    nom_usu: "",
    ape_usu: "",
    email_usu: "",
    rol_usu: "",
  };

  //   En los modales
  const fields = [
    { key: "nom_usu", label: "Nombre" },
    { key: "ape_usu", label: "Apellido" },
    { key: "email_usu", label: "Correo" },
    { key: "pass_usu", label: "Contraseña" },
  ];

  //   En la tabla
  const columns = [
    { key: "nom_usu", label: "Nombre" },
    { key: "ape_usu", label: "Apellido" },
    { key: "email_usu", label: "Correo" },
    { key: "pass_usu", label: "Contraseña" },
  ];

  const message = "nom_usu";

  const searchBy = "cedula";

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
