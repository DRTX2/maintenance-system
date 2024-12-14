import GenericManager from "../GenericManager";

const UbicationsManager = () => {
  const apiConfig = {
    fetchAll: "http://127.0.0.1:8000/api/locations",
    fetchOne: "http://127.0.0.1:8000/api/locations",
    fetchSearch: "http://127.0.0.1:8000/api/locations/search?term=",
    create: "http://127.0.0.1:8000/api/locations",
    update: "http://127.0.0.1:8000/api/locations",
    delete: "http://127.0.0.1:8000/api/locations",
  };

  // La definción del objeto, utilizado para obtener valores y otras cosas
  const defaultEntityState = {
    cod_loc: "",
    nam_loc: "",
  };

  // Utilizados para validar y otras cosas
  const fields = [
    { key: "cod_loc", label: "Código" },
    { key: "nam_loc", label: "Nombre" },
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
