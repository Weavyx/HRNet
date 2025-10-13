/**
 * @fileoverview Configuration du routeur React Router avec lazy loading optimisé.
 */

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import PageLoader from "./components/PageLoader";

/**
 * Chargement paresseux de la page CreateEmployee avec préchargement intelligent.
 * Précharge automatiquement la page Employees après 2 secondes pour améliorer la navigation.
 */
const CreateEmployee = lazy(() =>
  import("./pages/CreateEmployee").then(module => {
    /** Précharger Employees quand CreateEmployee est chargé pour une navigation plus fluide */
    setTimeout(() => import("./pages/Employees"), 2000);
    return module;
  }),
);

/**
 * Chargement paresseux de la page Employees avec préchargement intelligent.
 * Précharge automatiquement la page CreateEmployee après 2 secondes pour améliorer la navigation.
 */
const Employees = lazy(() =>
  import("./pages/Employees").then(module => {
    /** Précharger CreateEmployee quand Employees est chargé pour une navigation plus fluide */
    setTimeout(() => import("./pages/CreateEmployee"), 2000);
    return module;
  }),
);

/**
 * Configuration du routeur principal de l'application.
 * Utilise le lazy loading avec Suspense pour optimiser les performances.
 * @type {import('react-router-dom').Router}
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader message="Chargement de la page de création d'employé..." />}>
            <CreateEmployee />
          </Suspense>
        ),
      },
      {
        path: "employees",
        element: (
          <Suspense fallback={<PageLoader message="Chargement des employés..." />}>
            <Employees />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;