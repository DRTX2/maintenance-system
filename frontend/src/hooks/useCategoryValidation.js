import { useState, useEffect } from "react";
import { validateField, validateCategoryFields } from "../utils/validations";

const useCategoryValidation = (initialValues) => {
  const [category, setCategory] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCategory(initialValues);
  }, [initialValues]);

  const handleFieldChange = (field, value) => {
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
