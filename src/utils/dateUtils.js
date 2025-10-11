/**
 * Date utilities for consistent date formatting across the application
 * All dates should be formatted as MM/DD/YYYY (US format)
 */

/**
 * Format a Date object to MM/DD/YYYY string
 * @param {Date} date - The date object to format
 * @returns {string} - Formatted date string (MM/DD/YYYY) or empty string if invalid
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
