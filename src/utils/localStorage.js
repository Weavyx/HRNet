/**
 * @fileoverview Utilitaires pour la gestion du localStorage et persistance des données.
 * Gère la sauvegarde et le chargement automatique des données d'employés.
 */

/**
 * Middleware Redux pour sauvegarder automatiquement l'état dans localStorage.
 * Ne sauvegarde que les actions liées aux employés pour optimiser les performances.
 *
 * @param {import('@reduxjs/toolkit').MiddlewareAPI} store - Le store Redux
 * @returns {Function} Le middleware configuré
 *
 * @example
 * const store = configureStore({
 *   reducer: rootReducer,
 *   middleware: (getDefaultMiddleware) =>
 *     getDefaultMiddleware().concat(localStorageMiddleware)
 * });
 */
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  /** Sauvegarder seulement les actions liées aux employés pour optimiser les performances */
  if (action.type?.startsWith("employees/")) {
    const state = store.getState();
    try {
      localStorage.setItem(
        "hrnet_employees",
        JSON.stringify(state.employees.employees)
      );
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  return result;
};

/**
 * Charge les données d'employés depuis localStorage.
 * Si aucune donnée n'est présente, retourne un tableau vide.
 *
 * @returns {Array<Object>} Liste des employés chargés ou tableau vide
 * @returns {Object} returns[].id - ID unique de l'employé
 * @returns {string} returns[].firstName - Prénom
 * @returns {string} returns[].lastName - Nom de famille
 * @returns {string} returns[].startDate - Date de début au format MM/DD/YYYY
 * @returns {string} returns[].department - Département
 * @returns {string} returns[].dateOfBirth - Date de naissance au format MM/DD/YYYY
 * @returns {string} returns[].street - Adresse (rue)
 * @returns {string} returns[].city - Ville
 * @returns {string} returns[].state - État/Province
 * @returns {string} returns[].zipCode - Code postal
 * @returns {string} returns[].createdAt - Timestamp ISO de création
 */
export const loadFromLocalStorage = () => {
  try {
    const savedEmployees = localStorage.getItem("hrnet_employees");
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }

  /** Retourner un tableau vide si aucune donnée n'est trouvée */
  return [];
};
