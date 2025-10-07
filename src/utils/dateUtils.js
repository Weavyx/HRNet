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

/**
 * Parse a date string in MM/DD/YYYY format to a Date object
 * @param {string} dateString - Date string in MM/DD/YYYY format
 * @returns {Date|null} - Date object or null if invalid
 */
export const parseDateFromUS = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return null;
  }

  const parts = dateString.split("/");
  if (parts.length !== 3) {
    return null;
  }

  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return null;
  }

  // Month is 0-indexed in Date constructor
  const date = new Date(year, month - 1, day);

  // Verify the date is valid and matches input
  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    return date;
  }

  return null;
};

/**
 * Check if a date string is in valid MM/DD/YYYY format
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if valid format
 */
export const isValidUSDateFormat = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return false;
  }

  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  return regex.test(dateString);
};

/**
 * Format date for display purposes (same as storage format)
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDateForDisplay = (date) => {
  if (typeof date === "string") {
    // If already a string, validate and return
    return isValidUSDateFormat(date) ? date : "";
  }

  // If Date object, format it
  return formatDateToUS(date);
};

/**
 * Get current date in MM/DD/YYYY format
 * @returns {string} - Current date formatted as MM/DD/YYYY
 */
export const getCurrentDateUS = () => {
  return formatDateToUS(new Date());
};

/**
 * Convert a date from DD/MM/YYYY (European) to MM/DD/YYYY (US) format
 * @param {string} europeanDate - Date in DD/MM/YYYY format
 * @returns {string} - Date in MM/DD/YYYY format or empty string if invalid
 */
export const convertEuropeanToUS = (europeanDate) => {
  if (!europeanDate || typeof europeanDate !== "string") {
    return "";
  }

  const parts = europeanDate.split("/");
  if (parts.length !== 3) {
    return "";
  }

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${month}/${day}/${year}`;
};
