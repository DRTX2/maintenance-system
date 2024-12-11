import { useState, useEffect, useRef } from "react";
import { validateField, validateCategoryFields } from "../utils/validations";

const useCategoryValidation = (initialValues) => {
  const [category, setCategory] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setCategory(initialValues); // Solo sincroniza al montarse o si los valores iniciales cambian externamente
    }
  }, [initialValues]);

  const handleFieldChange = (field, value) => {
    isInitialMount.current = false; // Marca que ya se está editando
    setCategory((prev) => ({ ...prev, [field]: value }));
    const errorMessage = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const validateFields = () => {
    const validationErrors = validateCategoryFields(category);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const resetFields = () => {
    isInitialMount.current = true; 
    setCategory(initialValues);
    setErrors({});
  };

  return {
    category,
    errors,
    handleFieldChange,
    validateFields,
    resetFields,
  };
};

export default useCategoryValidation;
