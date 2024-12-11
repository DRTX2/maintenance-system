import GenericManager from "../GenericManager";

const CategoryManager = () => {
  const apiConfig = {
    fetchAll: "http://127.0.0.1:8000/api/category",
    fetchOne: "http://127.0.0.1:8000/api/category/show",
    fetchSearch: "http://127.0.0.1:8000/api/categories/search?term=",
    create: "http://127.0.0.1:8000/api/category/store",
    update: "http://127.0.0.1:8000/api/category/update",
    delete: "http://127.0.0.1:8000/api/category/destroy",
  };

  // El estado inicial del objeto, necesario para saber que enviar al backend y lo que este devuelva.
  const defaultEntityState = {
    cod_dis: "",
    tip_dis: "",
    nom_dis: "",
  };

  // Campos que se muestran en los modales.
  const fields = [
    { key: "cod_dis", label: "Código" },
    { key: "tip_dis", label: "Tipo" },
    { key: "nom_dis", label: "Nombre" },
  ];

  // Campos que se muestran en las tablas.
  const columns = [
    { key: "cod_dis", label: "Código" },
    { key: "tip_dis", label: "Tipo" },
    { key: "nom_dis", label: "Nombre" },
  ];

  const message = "nom_dis";
  const searchBy = "codigo";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityNamePlural="Categorías"
      entityNameSingular="Categoria"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default CategoryManager;
