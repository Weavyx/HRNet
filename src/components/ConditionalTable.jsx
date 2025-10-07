import { lazy, Suspense } from 'react';

// Lazy loading d'ag-grid seulement quand nécessaire
const AgGridTable = lazy(() => import('./AgGridTable'));

const ConditionalTable = ({ employees, quickFilterText, onGridReady }) => {
  // Si pas d'employés, pas besoin de charger ag-grid
  if (employees.length === 0) {
    return (
      <div className="employee-list__empty">
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👥</div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            No employees found
          </div>
          <div>Add your first employee!</div>
        </div>
      </div>
    );
  }

  // Charger ag-grid seulement si on a des données
  return (
    <Suspense fallback={
      <div className="loading-table" style={{
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '4px'
      }}>
        <span>⏳ Loading table...</span>
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