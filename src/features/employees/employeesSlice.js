import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  employees: loadFromLocalStorage(),
  loading: false,
  error: null,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const employee = {
        id: Date.now(), // Simple ID generation
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.employees.push(employee);
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    updateEmployee: (state, action) => {
      const { id, ...updates } = action.payload;
      const existingEmployee = state.employees.find(
        (employee) => employee.id === id
      );
      if (existingEmployee) {
        Object.assign(existingEmployee, updates);
      }
    },
    clearEmployees: (state) => {
      state.employees = [];
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee, clearEmployees } =
  employeesSlice.actions;

// Selectors
export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployeeById = (state, employeeId) =>
  state.employees.employees.find((employee) => employee.id === employeeId);
export const selectEmployeesCount = (state) => state.employees.employees.length;

export default employeesSlice.reducer;
