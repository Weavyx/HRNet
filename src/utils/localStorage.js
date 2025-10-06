// Middleware pour sauvegarder l'état dans localStorage
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Sauvegarder seulement les actions liées aux employés
  if (action.type?.startsWith("employees/")) {
    const state = store.getState();
    try {
      localStorage.setItem(
        "hrnet_employees",
        JSON.stringify(state.employees.employees)
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde dans localStorage:", error);
    }
  }

  return result;
};

// Fonction pour charger l'état depuis localStorage
export const loadFromLocalStorage = () => {
  try {
    const savedEmployees = localStorage.getItem("hrnet_employees");
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    }
  } catch (error) {
    console.error("Erreur lors du chargement depuis localStorage:", error);
  }
  return [];
};
