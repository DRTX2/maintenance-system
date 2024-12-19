import GenericManager from "../GenericManager";

const UbicationsManager = () => {
  const apiConfig = {
    fetchAll: "/locations",
    fetchOne: "/locations",
    fetchSearch: "/locations/search?term=",
    create: "/locations",
    update: "/locations",
    delete: "/locations",
  };

  // La definción del objeto, utilizado para obtener valores y otras cosas
  const defaultEntityState = {
    cod_loc: "",
    nam_loc: "",
  };

  // Utilizados para validar y otras cosas
  const fields = [
    { key: "cod_loc", label: "Código", type: "text" },
    { key: "nam_loc", label: "Nombre", type: "text" },
  ];

  // Las columnas para la tabla
  const columns = [
    { key: "cod_loc", label: "Código" },
    { key: "nam_loc", label: "Nombre" },
  ];

  const message = "nam_loc";
  const searchBy = "codigo";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityNamePlural="Ubicaciones"
      entityNameSingular="Ubicacion"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default UbicationsManager;
