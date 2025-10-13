/**
 * @fileoverview Slice Redux pour la gestion des employés.
 * Gère l'état des employés avec actions pour ajouter de nouveaux employés.
 * @module employeesSlice
 */

import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../utils/localStorage";

/**
 * État initial du slice employés.
 * @type {Object}
 * @property {Array<Object>} employees - Liste des employés chargés depuis localStorage
 * @property {boolean} loading - Indicateur de chargement
 * @property {string|null} error - Message d'erreur éventuel
 */
const initialState = {
  employees: loadFromLocalStorage(),
  loading: false,
  error: null,
};

/**
 * Slice Redux pour la gestion des employés.
 * @type {import('@reduxjs/toolkit').Slice}
 */
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    /**
     * Ajoute un nouvel employé à la liste.
     * Génère automatiquement un ID unique et ajoute un timestamp de création.
     *
     * @param {Object} state - L'état actuel
     * @param {import('@reduxjs/toolkit').PayloadAction<Object>} action - Action contenant les données de l'employé
     * @param {Object} action.payload - Les données de l'employé à ajouter
     */
    addEmployee: (state, action) => {
      const employee = {
        id: Date.now() /** Génération simple d'ID basée sur timestamp */,
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.employees.push(employee);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;

/**
 * @namespace Selectors
 * @description Sélecteurs pour extraire des données du state des employés
 */

/**
 * Sélectionne tous les employés de l'état.
 * @function selectAllEmployees
 * @param {Object} state - L'état global de l'application
 * @returns {Array<Object>} La liste complète des employés
 */
export const selectAllEmployees = (state) => state.employees.employees;

/**
 * Sélectionne le nombre total d'employés.
 * @function selectEmployeesCount
 * @param {Object} state - L'état global de l'application
 * @returns {number} Le nombre total d'employés
 */
export const selectEmployeesCount = (state) => state.employees.employees.length;

export default employeesSlice.reducer;
