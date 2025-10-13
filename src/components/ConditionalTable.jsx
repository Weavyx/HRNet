import { lazy, Suspense } from 'react';
import '../styles/components/ConditionalTable.css';

// Lazy loading d'ag-grid seulement quand nécessaire
const AgGridTable = lazy(() => import('./AgGridTable'));

const ConditionalTable = ({ employees, quickFilterText, onGridReady }) => {
  // Si pas d'employés, pas besoin de charger ag-grid
  if (employees.length === 0) {
    return (
      <div className="employees__empty">
        <div className="employees__empty-icon">👥</div>
        <div className="employees__empty-title">
          No employees found
        </div>
        <div>Add your first employee!</div>
      </div>
    );
  }

  // Charger ag-grid seulement si on a des données
  return (
    <Suspense fallback={
      <div className="loading-table">
        <div className="loading-table__content">
          <div className="loading-table__spinner"></div>
          <span className="loading-table__message">
            Loading data table...
          </span>
        </div>
      </div>
    }>
      <AgGridTable
        employees={employees}
        quickFilterText={quickFilterText}
        onGridReady={onGridReady}
      />
    </Suspense>
  );
};

export default ConditionalTable;