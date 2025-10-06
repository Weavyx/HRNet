import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <CreateEmployee /> },
      { path: "employee-list", element: <EmployeeList /> },
    ],
  },
]);

export default router;