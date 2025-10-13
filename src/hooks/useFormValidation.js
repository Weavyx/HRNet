import { useState } from "react";
import { DEPARTMENTS, US_STATES } from "../constants/formOptions";

/**
 * Hook personnalisé pour la validation du formulaire d'employé.
 * Fournit une validation en temps réel avec gestion des erreurs et état des champs.
 *
 * @param {Object} [initialValues={}] - Valeurs initiales du formulaire d'employé
 *
 * @returns {Object} Objet contenant l'état et les méthodes de gestion du formulaire
 * @returns {Object} returns.values - Les valeurs actuelles du formulaire
 * @returns {Object<string, string>} returns.errors - Les erreurs de validation par champ
 * @returns {Object<string, boolean>} returns.touched - État "touché" de chaque champ
 * @returns {Function} returns.handleChange - Fonction pour gérer le changement d'un champ
 * @returns {Function} returns.handleDateChange - Fonction spécialisée pour les champs de date
 * @returns {Function} returns.validateField - Fonction pour valider un champ spécifique
 * @returns {Function} returns.validateAll - Fonction pour valider tous les champs
 * @returns {Function} returns.markAllAsTouched - Fonction pour marquer tous les champs comme touchés
 * @returns {Function} returns.handleSubmit - Fonction pour gérer la soumission avec validation
 * @returns {Function} returns.reset - Fonction pour réinitialiser le formulaire
 * @returns {Function} returns.isValid - Fonction pour vérifier si le formulaire est valide
 * @returns {Function} returns.hasFieldError - Fonction pour vérifier si un champ a une erreur visible
 * @returns {Function} returns.getFieldError - Fonction pour obtenir l'erreur d'un champ
 *
 * @example
 * const {
 *   values: formData,
 *   errors,
 *   handleChange,
 *   handleDateChange,
 *   handleSubmit,
 *   reset
 * } = useFormValidation(initialEmployeeData);
 */
export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Règles de validation pour chaque champ du formulaire d'employé.
   */
  const validationRules = {
    firstName: (value) => {
      if (!value || value.trim().length === 0) {
        return "Le prénom est requis";
      }
      if (value.trim().length < 2) {
        return "Le prénom doit contenir au moins 2 caractères";
      }
      if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
        return "Le prénom ne doit contenir que des lettres, espaces, tirets et apostrophes";
      }
      return "";
    },

    lastName: (value) => {
      if (!value || value.trim().length === 0) {
        return "Le nom de famille est requis";
      }
      if (value.trim().length < 2) {
        return "Le nom de famille doit contenir au moins 2 caractères";
      }
      if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
        return "Le nom de famille ne doit contenir que des lettres, espaces, tirets et apostrophes";
      }
      return "";
    },

    dateOfBirth: (date) => {
      if (!date) {
        return ""; // Optionnel
      }
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (birthDate > today) {
        return "La date de naissance ne peut pas être dans le futur";
      }
      if (age < 16) {
        return "L'employé doit avoir au moins 16 ans";
      }
      if (age > 120) {
        return "Veuillez vérifier la date de naissance";
      }
      return "";
    },

    startDate: (date) => {
      if (!date) {
        return ""; // Optionnel
      }
      const today = new Date();
      const startDate = new Date(date);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      if (startDate < oneYearAgo) {
        return "La date de début ne peut pas être antérieure à un an";
      }
      return "";
    },

    street: (value) => {
      if (!value) {
        return ""; // Optionnel
      }
      if (value.trim().length < 5) {
        return "L'adresse doit contenir au moins 5 caractères";
      }
      if (!/^[a-zA-Z0-9À-ÿ\s,.-]+$/.test(value)) {
        return "L'adresse contient des caractères invalides";
      }
      return "";
    },

    city: (value) => {
      if (!value) {
        return ""; // Optionnel
      }
      if (value.trim().length < 2) {
        return "La ville doit contenir au moins 2 caractères";
      }
      if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
        return "La ville ne doit contenir que des lettres, espaces, tirets et apostrophes";
      }
      return "";
    },

    state: (value) => {
      if (!value) {
        return ""; // Optionnel
      }
      const validStates = US_STATES.map((state) => state.value);
      if (!validStates.includes(value)) {
        return "Veuillez sélectionner un état valide";
      }
      return "";
    },

    zipCode: (value) => {
      if (!value) {
        return ""; // Optionnel
      }
      if (!/^\d{5}(-\d{4})?$/.test(value)) {
        return "Le code postal doit être au format 12345 ou 12345-6789";
      }
      return "";
    },

    department: (value) => {
      if (!value || value.trim().length === 0) {
        return "Le département est requis";
      }
      const validDepartments = DEPARTMENTS.map((dept) => dept.value);
      if (!validDepartments.includes(value)) {
        return "Veuillez sélectionner un département valide";
      }
      return "";
    },
  };

  /**
   * Valide un champ spécifique en appliquant sa règle de validation.
   * @param {string} fieldName - Le nom du champ à valider
   * @param {*} value - La valeur à valider
   * @returns {string} Message d'erreur ou chaîne vide si valide
   */
  const validateField = (fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) {
      return "";
    }

    return rule(value);
  };

  /**
   * Valide tous les champs du formulaire.
   * @param {Object} [formData=values] - Les données à valider (par défaut les valeurs actuelles)
   * @returns {Object<string, string>} Objet contenant les erreurs de validation par champ
   */
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

  /**
   * Gère le changement de valeur d'un champ avec validation en temps réel.
   * Met à jour la valeur, marque le champ comme touché et valide.
   * @param {string} fieldName - Le nom du champ modifié
   * @param {*} value - La nouvelle valeur du champ
   */
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

  /**
   * Gère spécifiquement les changements de dates avec validation.
   * @param {Date|null} date - La nouvelle date sélectionnée
   * @param {string} fieldName - Le nom du champ de date
   */
  const handleDateChange = (date, fieldName) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: date,
    }));

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    const error = validateField(fieldName, date);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  /**
   * Marque tous les champs comme touchés pour afficher les erreurs de validation.
   * Utile lors de la soumission du formulaire.
   */
  const markAllAsTouched = () => {
    const allFields = Object.keys(validationRules);
    const touchedState = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(touchedState);
  };

  /**
   * Crée une fonction de soumission avec validation complète du formulaire.
   * @param {Function} onSubmit - Fonction callback appelée si le formulaire est valide
   * @returns {Function} Fonction de gestion de l'événement de soumission
   */
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

  /**
   * Réinitialise le formulaire avec de nouvelles valeurs ou les valeurs initiales.
   * Efface toutes les erreurs et remet tous les champs comme non-touchés.
   * @param {Object} [newValues=initialValues] - Nouvelles valeurs pour le formulaire
   */
  const reset = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  };

  /**
   * Vérifie si le formulaire est entièrement valide.
   * @type {boolean}
   */
  const isValid = Object.keys(validateAll()).length === 0;

  /**
   * Vérifie si un champ spécifique a une erreur visible.
   * Une erreur n'est visible que si le champ a été touché et contient une erreur.
   * @param {string} fieldName - Le nom du champ à vérifier
   * @returns {boolean} True si le champ a une erreur visible
   */
  const hasError = (fieldName) => {
    return Boolean(errors[fieldName] && touched[fieldName]);
  };

  /**
   * Obtient le message d'erreur pour un champ spécifique.
   * Retourne l'erreur seulement si le champ a été touché.
   * @param {string} fieldName - Le nom du champ
   * @returns {string} Le message d'erreur ou chaîne vide
   */
  const getError = (fieldName) => {
    return touched[fieldName] ? errors[fieldName] : "";
  };

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleDateChange,
    markAllAsTouched,
    handleSubmit,
    reset,
    validateField,
    validateAll,
    hasError,
    getError,
  };
}
