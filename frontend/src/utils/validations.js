// Validaciones para las categorias

export const validateCategoryFields = (data) => {
  const errors = {};

  if (!data.cod_dis) {
    errors.cod_dis = "El código es obligatorio";
  }

  if (!data.tip_dis) {
    errors.tip_dis = "El tipo es obligatorio";
  }

  if (!data.nom_dis) {
    errors.nom_dis = "El nombre es obligatorio";
  }

  return errors;
};

export const validateField = (field, value) => {
  if (field === "cod_dis" && !value) {
    return "El código es obligatorio";
  }

  if (field === "tip_dis" && !value) {
    return "El tipo es obligatorio";
  }

  if (field === "nom_dis" && !value) {
    return "El nombre es obligatorio";
  }

  return ""; // No hay error
};
