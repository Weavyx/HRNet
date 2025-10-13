import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
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

  return {
    employees,
    employeesCount,
    createEmployee,
  };
};
