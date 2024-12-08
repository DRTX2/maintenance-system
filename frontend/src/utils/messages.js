const MESSAGES = {
  SUCCESS: {
    CATEGORY_CREATED: "¡Categoría creada exitosamente!",
    CATEGORY_DELETED: "¡Categoría eliminada exitosamente!",
    CATEGORY_UPDATED: "¡Categoría actualizada exitosamente!",
  },

  ERROR: {
    422: "El código ya se encuentra registrado.",
    404: "Recurso no encontrado",
    FETCH_CATEGORIES: "No se pudieron obtener las categorías.",
    CREATE_CATEGORY: "No se pudo crear la categoría. Verifica los datos.",
    DELETE_CATEGORY: "No se pudo eliminar la categoría. Inténtalo de nuevo.",
    UPDATE_CATEGORY: "No se pudo actualizar la categoría. Verifica los datos.",
    FETCH_CATEGORY: "No se pudo obtener la categoría. Intentelo de nuevo",
    DEFAULT: "Ocurrió un error inesperado.",
    CONNECTION: "No se pudo conectar con el servidor.",
  },
};

export default MESSAGES;
