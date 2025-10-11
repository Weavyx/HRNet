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

  // Si pas de données, retourner des données de test
  const mockEmployees = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      startDate: "01/15/2023",
      department: "Engineering",
      dateOfBirth: "05/12/1990",
      street: "123 Main St",
      city: "Springfield",
      state: "Illinois",
      zipCode: "62701",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      startDate: "03/20/2023",
      department: "Human Resources",
      dateOfBirth: "08/25/1985",
      street: "456 Oak Ave",
      city: "Chicago",
      state: "Illinois",
      zipCode: "60601",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      startDate: "06/10/2023",
      department: "Marketing",
      dateOfBirth: "12/03/1988",
      street: "789 Pine Rd",
      city: "Los Angeles",
      state: "California",
      zipCode: "90210",
      createdAt: new Date().toISOString(),
    },
  ];

  // Sauvegarder les données de test pour les prochains chargements
  try {
    localStorage.setItem("hrnet_employees", JSON.stringify(mockEmployees));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données de test:", error);
  }

  return mockEmployees;
};
