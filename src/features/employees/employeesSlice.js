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
  },
});

export const { addEmployee } = employeesSlice.actions;

// Selectors
export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployeesCount = (state) => state.employees.employees.length;

export default employeesSlice.reducer;
