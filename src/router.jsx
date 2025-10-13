import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import PageLoader from "./components/PageLoader";

// Lazy loading des pages pour réduire le bundle initial avec préchargement
const CreateEmployee = lazy(() =>
  import("./pages/CreateEmployee").then(module => {
    // Précharger Employees quand CreateEmployee est chargé
    setTimeout(() => import("./pages/Employees"), 2000);
    return module;
  })
);

const Employees = lazy(() =>
  import("./pages/Employees").then(module => {
    // Précharger CreateEmployee quand Employees est chargé
    setTimeout(() => import("./pages/CreateEmployee"), 2000);
    return module;
  })
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader message="Loading create employee page..." />}>
            <CreateEmployee />
          </Suspense>
        )
      },
      {
        path: "employees",
        element: (
          <Suspense fallback={<PageLoader message="Loading employees..." />}>
            <Employees />
          </Suspense>
        )
      },
    ],
  },
]);

export default router;