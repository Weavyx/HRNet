import { lazy, Suspense } from 'react';

// Lazy loading d'ag-grid seulement quand nécessaire
const AgGridTable = lazy(() => import('./AgGridTable'));

const ConditionalTable = ({ employees, quickFilterText, onGridReady }) => {
  // Si pas d'employés, pas besoin de charger ag-grid
  if (employees.length === 0) {
    return (
      <div className="employees__empty">
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
        background: 'transparent',
        borderRadius: '4px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: 'white'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.2)',
            borderTop: '4px solid #667eea',
            borderRight: '4px solid #764ba2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
          }}></div>
          <span style={{ fontSize: '1rem', opacity: 0.9, textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>
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