/**
 * Simple test file to verify date utilities work correctly
 * Run this in browser console to test date formatting
 */

import {
  formatDateToUS,
  parseDateFromUS,
  isValidUSDateFormat,
  getCurrentDateUS,
} from "../utils/dateUtils.js";

// Test formatDateToUS
console.log("=== Testing formatDateToUS ===");
const testDate1 = new Date(2023, 11, 25); // December 25, 2023 (month is 0-indexed)
console.log("Date:", testDate1);
console.log("Formatted:", formatDateToUS(testDate1)); // Should be "12/25/2023"

const testDate2 = new Date(2023, 0, 1); // January 1, 2023
console.log("Date:", testDate2);
console.log("Formatted:", formatDateToUS(testDate2)); // Should be "01/01/2023"

// Test parseDateFromUS
console.log("\n=== Testing parseDateFromUS ===");
const parsed1 = parseDateFromUS("12/25/2023");
console.log('Parsed "12/25/2023":', parsed1); // Should be valid Date object

const parsed2 = parseDateFromUS("01/01/2023");
console.log('Parsed "01/01/2023":', parsed2); // Should be valid Date object

const parsed3 = parseDateFromUS("invalid");
console.log('Parsed "invalid":', parsed3); // Should be null

// Test isValidUSDateFormat
console.log("\n=== Testing isValidUSDateFormat ===");
console.log('Valid "12/25/2023":', isValidUSDateFormat("12/25/2023")); // Should be true
console.log('Valid "01/01/2023":', isValidUSDateFormat("01/01/2023")); // Should be true
console.log('Invalid "25/12/2023":', isValidUSDateFormat("25/12/2023")); // Should be false
console.log('Invalid "12-25-2023":', isValidUSDateFormat("12-25-2023")); // Should be false

// Test getCurrentDateUS
console.log("\n=== Testing getCurrentDateUS ===");
console.log("Current date US format:", getCurrentDateUS()); // Should be today in MM/DD/YYYY

export {
  formatDateToUS,
  parseDateFromUS,
  isValidUSDateFormat,
  getCurrentDateUS,
};
