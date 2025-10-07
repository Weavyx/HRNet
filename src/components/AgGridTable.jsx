import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo, useRef } from 'react';

// Enregistrement des modules AG Grid Community (une seule fois)
ModuleRegistry.registerModules([AllCommunityModule]);

const AgGridTable = ({ employees, quickFilterText, onGridReady }) => {
  const gridRef = useRef();

  // Configuration responsive des colonnes AG Grid - Mémorisée
  const columnDefs = useMemo(() => [
    {
      field: 'firstName',
      headerName: 'First Name',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: false
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: false
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      filter: 'agDateColumnFilter',
      sortable: true,
      flex: 1,
      minWidth: 110,
      hide: window.innerWidth < 768 // Masquer sur mobile
    },
    {
      field: 'department',
      headerName: 'Department',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 120,
      hide: false
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      filter: 'agDateColumnFilter',
      sortable: true,
      flex: 1,
      minWidth: 120,
      hide: window.innerWidth < 1024 // Masquer sur tablette et mobile
    },
    {
      field: 'street',
      headerName: 'Street',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 120,
      hide: window.innerWidth < 1200 // Masquer sur écrans moyens
    },
    {
      field: 'city',
      headerName: 'City',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: window.innerWidth < 992 // Masquer sur tablette
    },
    {
      field: 'state',
      headerName: 'State',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 80,
      hide: window.innerWidth < 1200 // Masquer sur écrans moyens
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: window.innerWidth < 1400 // Masquer sur petits écrans
    }
  ], []);

  // Configuration par défaut d'AG Grid - Mémorisée
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    minWidth: 100,
  }), []);

  // Configuration de la grille - Mémorisée
  const gridOptions = useMemo(() => ({
    columnDefs: columnDefs,
    defaultColDef: defaultColDef,
    rowSelection: 'multiple',
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [5, 10, 20, 50, 100],
    suppressCellFocus: true,
    enableCellTextSelection: true,
    domLayout: 'normal',
    quickFilterText: quickFilterText,
  }), [columnDefs, defaultColDef, quickFilterText]);

  return (
    <div className="ag-theme-alpine employee-list__table" style={{ height: '400px', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={employees}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default AgGridTable;