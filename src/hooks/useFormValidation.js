import { useState } from "react";

/**
 * Hook personnalisé pour gérer la validation de formulaires
 * @param {Object} validationRules - Objet contenant les règles de validation pour chaque champ
 * @param {Object} initialValues - Valeurs initiales du formulaire
 * @returns {Object} - Objet contenant les valeurs, erreurs, fonctions de gestion
 */
export function useFormValidation(validationRules, initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Valider un champ spécifique
  const validateField = (fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return "";

    return rule(value);
  };

  // Valider tous les champs
  const validateAll = (formData = values) => {
    const newErrors = {};

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  };

  // Gérer le changement de valeur d'un champ
  const handleChange = (fieldName, value) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Marquer un champ comme touché
  const markAsTouched = (fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  // Marquer tous les champs comme touchés
  const markAllAsTouched = () => {
    const allFields = Object.keys(validationRules);
    const touchedState = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(touchedState);
  };

  // Soumettre le formulaire avec validation complète
  const handleSubmit = (onSubmit) => {
    return (event) => {
      if (event) {
        event.preventDefault();
      }

      markAllAsTouched();

      const validationErrors = validateAll();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
        return true;
      } else {
        return false;
      }
    };
  };

  // Réinitialiser le formulaire
  const reset = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  };

  // Vérifier si le formulaire est valide
  const isValid = Object.keys(validateAll()).length === 0;

  // Vérifier si un champ spécifique a une erreur visible
  const hasError = (fieldName) => {
    return !!(errors[fieldName] && touched[fieldName]);
  };

  // Obtenir le message d'erreur pour un champ
  const getError = (fieldName) => {
    return touched[fieldName] ? errors[fieldName] : "";
  };

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    markAsTouched,
    markAllAsTouched,
    handleSubmit,
    reset,
    validateField,
    validateAll,
    hasError,
    getError,
    setValues,
    setErrors,
    setTouched,
  };
}
