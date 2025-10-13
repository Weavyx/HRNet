/**
 * @fileoverview Hook personnalisé pour la gestion des employés.
 * Interface simplifiée pour les opérations CRUD sur les employés via Redux.
 */

import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  selectAllEmployees,
  selectEmployeesCount,
} from "../features/employees/employeesSlice";

/**
 * Hook personnalisé pour gérer les employés avec Redux.
 * Fournit une interface simplifiée pour accéder aux données et actions des employés.
 *
 * @returns {Object} Interface pour la gestion des employés
 * @returns {Array<Object>} returns.employees - Liste complète des employés
 * @returns {number} returns.employeesCount - Nombre total d'employés
 * @returns {Function} returns.createEmployee - Fonction pour créer un nouvel employé
 *
 * @example
 * const { employees, employeesCount, createEmployee } = useEmployees();
 *
 * // Créer un nouvel employé
 * createEmployee({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   department: 'Engineering',
 *   // ... autres propriétés
 * });
 *
 * // Utiliser la liste des employés
 * console.log(`Total: ${employeesCount} employés`);
 */
export const useEmployees = () => {
  const dispatch = useDispatch();

  const employees = useSelector(selectAllEmployees);
  const employeesCount = useSelector(selectEmployeesCount);

  /**
   * Crée un nouvel employé en dispatchant l'action Redux.
   * @param {Object} employeeData - Les données du nouvel employé
   */
  const createEmployee = (employeeData) => {
    dispatch(addEmployee(employeeData));
  };

  return {
    employees,
    employeesCount,
    createEmployee,
  };
};
