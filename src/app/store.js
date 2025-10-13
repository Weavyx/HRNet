/**
 * @fileoverview Configuration du store Redux pour l'application HRNet.
 */

import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeesSlice";
import { localStorageMiddleware } from "../utils/localStorage";

/**
 * Store Redux principal de l'application.
 * Configure le reducer des employés et le middleware de persistance localStorage.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
