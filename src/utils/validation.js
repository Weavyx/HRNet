import { US_STATES, DEPARTMENTS } from "../constants/formOptions";

/**
 * Règles de validation réutilisables pour les formulaires
 * Chaque fonction prend une valeur et retourne une chaîne d'erreur (vide si pas d'erreur)
 */

// Validation pour les noms (prénom, nom)
export const validateName = (value, fieldName = "champ") => {
  if (!value || value.trim().length === 0) {
    return `Le ${fieldName} est requis`;
  }
  if (value.trim().length < 2) {
    return `Le ${fieldName} doit contenir au moins 2 caractères`;
  }
  if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
    return `Le ${fieldName} ne doit contenir que des lettres, espaces, traits d'union et apostrophes`;
  }
  return "";
};

// Validation pour le prénom
export const validateFirstName = (value) => validateName(value, "prénom");

// Validation pour le nom
export const validateLastName = (value) => validateName(value, "nom");

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
    return "La date de naissance ne peut pas être dans le futur";
  }
  if (age < 16) {
    return "L'employé doit avoir au moins 16 ans";
  }
  if (age > 120) {
    return "Veuillez vérifier la date de naissance";
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
    return "La date de début ne peut pas être antérieure à un an";
  }
  return "";
};

// Validation pour l'adresse (rue)
export const validateStreet = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  if (value.trim().length < 5) {
    return "L'adresse doit contenir au moins 5 caractères";
  }
  if (!/^[a-zA-Z0-9À-ÿ\s,.-]+$/.test(value)) {
    return "L'adresse contient des caractères non valides";
  }
  return "";
};

// Validation pour la ville
export const validateCity = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  if (value.trim().length < 2) {
    return "La ville doit contenir au moins 2 caractères";
  }
  if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
    return "La ville ne doit contenir que des lettres, espaces, traits d'union et apostrophes";
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
    return "Veuillez sélectionner un état valide";
  }
  return "";
};

// Validation pour le code postal
export const validateZipCode = (value) => {
  if (!value) {
    return ""; // Optionnel
  }
  if (!/^\d{5}(-\d{4})?$/.test(value)) {
    return "Le code postal doit être au format 12345 ou 12345-6789";
  }
  return "";
};

// Validation pour le département
export const validateDepartment = (value) => {
  if (!value || value.trim().length === 0) {
    return "Le département est requis";
  }
  const validDepartments = DEPARTMENTS.map((dept) => dept.value);
  if (!validDepartments.includes(value)) {
    return "Veuillez sélectionner un département valide";
  }
  return "";
};

// Validation pour email (utilitaire pour d'autres formulaires)
export const validateEmail = (value) => {
  if (!value) {
    return "L'email est requis";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Veuillez saisir un email valide";
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
    return "Veuillez saisir un numéro de téléphone valide";
  }
  return "";
};

// Validation générique pour les champs requis
export const validateRequired = (value, fieldName = "Ce champ") => {
  if (!value || (typeof value === "string" && value.trim().length === 0)) {
    return `${fieldName} est requis`;
  }
  return "";
};

// Validation pour longueur minimale
export const validateMinLength = (value, minLength, fieldName = "Ce champ") => {
  if (!value) return "";
  if (value.toString().length < minLength) {
    return `${fieldName} doit contenir au moins ${minLength} caractères`;
  }
  return "";
};

// Validation pour longueur maximale
export const validateMaxLength = (value, maxLength, fieldName = "Ce champ") => {
  if (!value) return "";
  if (value.toString().length > maxLength) {
    return `${fieldName} ne peut pas dépasser ${maxLength} caractères`;
  }
  return "";
};
