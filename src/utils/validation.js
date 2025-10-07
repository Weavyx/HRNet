import { US_STATES, DEPARTMENTS } from "../constants/formOptions";

/**
 * Règles de validation réutilisables pour les formulaires
 * Chaque fonction prend une valeur et retourne une chaîne d'erreur (vide si pas d'erreur)
 */

// Validation pour les noms (prénom, nom)
export const validateName = (value, fieldName = "field") => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  if (value.trim().length < 2) {
    return `${fieldName} must contain at least 2 characters`;
  }
  if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
    return `${fieldName} must contain only letters, spaces, hyphens and apostrophes`;
  }
  return "";
};

// Validation pour le prénom
export const validateFirstName = (value) => validateName(value, "First name");

// Validation pour le nom
export const validateLastName = (value) => validateName(value, "Last name");

// Validation pour la date de naissance
export const validateDateOfBirth = (date) => {
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
    return "Birth date cannot be in the future";
  }
  if (age < 16) {
    return "Employee must be at least 16 years old";
  }
  if (age > 120) {
    return "Please check the birth date";
  }
  return "";
};

// Validation pour la date de début
export const validateStartDate = (date) => {
  if (!date) {
    return ""; // Optionnel
  }

  const today = new Date();
  const startDate = new Date(date);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  if (startDate < oneYearAgo) {
    return "Start date cannot be more than one year ago";
  }
  return "";
};

// Validation pour l'adresse (rue)
export const validateStreet = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  if (value.trim().length < 5) {
    return "Address must contain at least 5 characters";
  }
  if (!/^[a-zA-Z0-9À-ÿ\s,.-]+$/.test(value)) {
    return "Address contains invalid characters";
  }
  return "";
};

// Validation pour la ville
export const validateCity = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  if (value.trim().length < 2) {
    return "City must contain at least 2 characters";
  }
  if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
    return "City must contain only letters, spaces, hyphens and apostrophes";
  }
  return "";
};

// Validation pour l'état
export const validateState = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  const validStates = US_STATES.map((state) => state.value);
  if (!validStates.includes(value)) {
    return "Please select a valid state";
  }
  return "";
};

// Validation pour le code postal
export const validateZipCode = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  if (!/^\d{5}(-\d{4})?$/.test(value)) {
    return "Zip code must be in format 12345 or 12345-6789";
  }
  return "";
};

// Validation pour le département
export const validateDepartment = (value) => {
  if (!value || value.trim().length === 0) {
    return "Department is required";
  }
  const validDepartments = DEPARTMENTS.map((dept) => dept.value);
  if (!validDepartments.includes(value)) {
    return "Please select a valid department";
  }
  return "";
};

// Validation pour email (utilitaire pour d'autres formulaires)
export const validateEmail = (value) => {
  if (!value) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email";
  }
  return "";
};

// Validation pour numéro de téléphone (utilitaire pour d'autres formulaires)
export const validatePhone = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(value.replace(/[\s\-()]/g, ""))) {
    return "Please enter a valid phone number";
  }
  return "";
};

// Validation générique pour les champs requis
export const validateRequired = (value, fieldName = "This field") => {
  if (!value || (typeof value === "string" && value.trim().length === 0)) {
    return `${fieldName} is required`;
  }
  return "";
};

// Validation pour longueur minimale
export const validateMinLength = (
  value,
  minLength,
  fieldName = "This field"
) => {
  if (!value) return "";
  if (value.toString().length < minLength) {
    return `${fieldName} must contain at least ${minLength} characters`;
  }
  return "";
};

// Validation pour longueur maximale
export const validateMaxLength = (
  value,
  maxLength,
  fieldName = "This field"
) => {
  if (!value) return "";
  if (value.toString().length > maxLength) {
    return `${fieldName} cannot exceed ${maxLength} characters`;
  }
  return "";
};
