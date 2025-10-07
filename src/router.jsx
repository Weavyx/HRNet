import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import PageLoader from "./components/PageLoader";

// Lazy loading des pages pour réduire le bundle initial avec préchargement
const CreateEmployee = lazy(() =>
  import("./pages/CreateEmployee").then(module => {
    // Précharger EmployeeList quand CreateEmployee est chargé
    setTimeout(() => import("./pages/EmployeeList"), 2000);
    return module;
  })
);

const EmployeeList = lazy(() =>
  import("./pages/EmployeeList").then(module => {
    // Précharger CreateEmployee quand EmployeeList est chargé
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
          <Suspense fallback={<PageLoader size="large" message="Loading create employee page..." />}>
            <CreateEmployee />
          </Suspense>
        )
      },
      {
        path: "employee-list",
        element: (
          <Suspense fallback={<PageLoader size="large" message="Loading employee list..." />}>
            <EmployeeList />
          </Suspense>
        )
      },
    ],
  },
]);

export default router;