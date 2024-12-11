const validationRules = {
  // Categorias
  cod_dis: {
    required: true,
    minLength: 3,
    message: "El código debe tener al menos 3 caracteres",
  },
  tip_dis: {
    required: true,
    minLength: 3,
    message: "El tipo debe tener al menos 3 caracteres",
  },
  nom_dis: {
    required: true,
    minLength: 3,
    message: "El nombre debe tener al menos 3 caracteres",
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
  // Proveedores
  nam_sup: {
    required: true,
    minLength: 3,
    message: "El nombre debe tener al menos 3 caracteres",
  },
  ema_sup: {
    required: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Debe ingresar un correo electrónico válido",
  },
  pho_sup: {
    required: true,
    regex: /^[0-9]{10}$/,
    message: "Debe ingresar un número de teléfono válido",
  },
};
// Todos los campos
export const validateFields = (data, fields) => {
  const errors = {};

  fields.forEach(({ key }) => {
    const rule = validationRules[key];
    const value = data[key];

    // Valida campos requeridos
    if (rule?.required && !value) {
      errors[key] = rule.message;
      // Valida longitud minima
    } else if (rule?.minLength && value?.length < rule.minLength) {
      errors[key] = `Debe tener al menos ${rule.minLength} caracteres`;
      // Valida las expresiones regulares
    } else if (rule?.regex && !rule.regex.test(value)) {
      errors[key] = rule.message;
    }
  });

  return errors;
};

// Un solo campo en tiempo real
export const validateField = (key, value) => {
  const rule = validationRules[key];

  // Valida el campo requerido
  if (rule?.required && !value) {
    return rule.message;
    // Valida la olngitud minima
  } else if (rule?.minLength && value?.length < rule.minLength) {
    return rule.message;
    // Validar expresiones regulares
  } else if (rule?.regex && !rule.regex.test(value)) {
    return rule.message;
  }

  return ""; // Sin error
};
