const validationRules = {
  // Categorias
  cod_dis: {
    required: true,
    minLength: 3,
    message: "El código debe tener al menos 3 caracteres",
  },
  tip_dis: { required: true, maxLength: 50, message: "El tipo es obligatorio" },
  nom_dis: {
    required: true,
    minLength: 3,
    maxLength: 50,
    message: "El nombre no puede exceder 50 caracteres",
  },
  // Ubicaciones
  cod_loc: {
    required: true,
    minLength: 3,
    message: "El código debe tener al menos 3 caracteres",
  },
  nam_loc: {
    required: true,
    minLength: 3,
    message: "El nombre debe tener al menos 3 caracteres",
  },
};

export const validateFields = (data, fields) => {
  const errors = {};

  fields.forEach(({ key }) => {
    const rule = validationRules[key];
    const value = data[key];

    if (rule?.required && !value) {
      errors[key] = rule.message;
    } else if (rule?.minLength && value?.length < rule.minLength) {
      errors[key] = `Debe tener al menos ${rule.minLength} caracteres`;
    } else if (rule?.maxLength && value?.length > rule.maxLength) {
      errors[key] = `No puede exceder ${rule.maxLength} caracteres`;
    }
  });

  return errors;
};

export const validateField = (key, value) => {
  const rule = validationRules[key];

  if (rule?.required && !value) {
    return rule.message;
  } else if (rule?.minLength && value?.length < rule.minLength) {
    return `Debe tener al menos ${rule.minLength} caracteres`;
  } else if (rule?.maxLength && value?.length > rule.maxLength) {
    return `No puede exceder ${rule.maxLength} caracteres`;
  }

  return ""; // Sin error
};
