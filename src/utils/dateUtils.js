/**
 * Utilitaires de date pour un formatage cohérent à travers l'application
 * Toutes les dates doivent être formatées en MM/DD/YYYY (format US)
 */

/**
 * Formate un objet Date en chaîne MM/DD/YYYY
 * @param {Date} date - L'objet date à formater
 * @returns {string} Chaîne de date formatée (MM/DD/YYYY) ou chaîne vide si invalide
 */
export const formatDateToUS = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
