import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  removeEmployee,
  updateEmployee,
  clearEmployees,
  selectAllEmployees,
  selectEmployeesCount,
} from "../features/employees/employeesSlice";

export const useEmployees = () => {
  const dispatch = useDispatch();

  const employees = useSelector(selectAllEmployees);
  const employeesCount = useSelector(selectEmployeesCount);

  const createEmployee = (employeeData) => {
    dispatch(addEmployee(employeeData));
  };

  const deleteEmployee = (id) => {
    dispatch(removeEmployee(id));
  };

  const editEmployee = (id, updates) => {
    dispatch(updateEmployee({ id, ...updates }));
  };

  const clearAllEmployees = () => {
    dispatch(clearEmployees());
  };

  return {
    employees,
    employeesCount,
    createEmployee,
    deleteEmployee,
    editEmployee,
    clearAllEmployees,
    getEmployeeById: (id) => employees.find((emp) => emp.id === id),
  };
};
