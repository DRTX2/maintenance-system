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

  const defaultEntityState = {
    cod_dis: "",
    tip_dis: "",
    nom_dis: "",
  };

  const fields = [
    { key: "cod_dis", label: "Código" },
    { key: "tip_dis", label: "Tipo" },
    { key: "nom_dis", label: "Nombre" },
  ];

  const columns = [
    { key: "cod_dis", label: "Código" },
    { key: "tip_dis", label: "Tipo" },
    { key: "nom_dis", label: "Nombre" },
  ];

  const message = "nom_dis";
  const searchBy = "nombre";

  return (
    <GenericManager
      apiConfig={apiConfig}
      entityName="Categorías"
      entityNameAdd="Categoria"
      defaultEntityState={defaultEntityState}
      fields={fields}
      columns={columns}
      message={message}
      searchBy={searchBy}
    />
  );
};

export default CategoryManager;
