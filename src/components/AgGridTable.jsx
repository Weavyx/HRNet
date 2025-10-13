import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { useMemo, useRef } from 'react';
import '../styles/components/AgGridTable.css';

// Enregistrement des modules AG Grid Community (une seule fois)
ModuleRegistry.registerModules([AllCommunityModule]);

const AgGridTable = ({ employees, quickFilterText, onGridReady }) => {
  const gridRef = useRef();

  // Configuration du thème AG Grid v34 avec la nouvelle API - noms de parts corrects
  const myTheme = useMemo(() => themeQuartz
    .withParams({
      // Couleurs de base
      backgroundColor: '#ffffff',
      foregroundColor: '#374151',
      borderColor: '#e2e8f0',

      // En-têtes
      headerBackgroundColor: '#f8fafc',
      headerTextColor: '#374151',
      headerBorderColor: '#e2e8f0',

      // Lignes
      oddRowBackgroundColor: '#fafbfc',
      evenRowBackgroundColor: '#ffffff',
      rowHoverColor: 'rgba(102, 126, 234, 0.06)',

      // Cellules
      cellTextColor: '#374151',

      // Pagination
      wrapperBorderColor: '#e2e8f0',
    }), []);

  // Configuration moderne des colonnes avec filtres natifs AG Grid
  const columnDefs = useMemo(() => [
    {
      field: 'firstName',
      headerName: 'First Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: false
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: false
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      filter: 'agDateColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
        browserDatePicker: true,
      },
      sortable: true,
      flex: 1,
      minWidth: 110,
      hide: window.innerWidth < 768
    },
    {
      field: 'department',
      headerName: 'Department',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 120,
      hide: false
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      filter: 'agDateColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
        browserDatePicker: true,
      },
      sortable: true,
      flex: 1,
      minWidth: 120,
      hide: window.innerWidth < 1024
    },
    {
      field: 'street',
      headerName: 'Street',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 120,
      hide: false // Toujours visible
    },
    {
      field: 'city',
      headerName: 'City',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: window.innerWidth < 992
    },
    {
      field: 'state',
      headerName: 'State',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 80,
      hide: false // Toujours visible
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        debounceMs: 200,
        suppressAndOrCondition: false,
      },
      sortable: true,
      flex: 1,
      minWidth: 100,
      hide: false // Toujours visible
    }
  ], []);

  // Configuration par défaut d'AG Grid - Mémorisée
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: false, // Désactiver les floating filters pour un affichage compact
    minWidth: 100,
  }), []);

  // Configuration adaptative de la pagination selon la taille d'écran
  const paginationConfig = useMemo(() => {
    const isMobile = window.innerWidth < 480;
    return {
      pageSize: isMobile ? 5 : 10, // Moins d'éléments par page sur mobile
      pageSizeSelector: isMobile ? [5, 10, 20] : [5, 10, 20, 50, 100] // Options simplifiées sur mobile
    };
  }, []);

  return (
    <div className="employees__table">
      <AgGridReact
        ref={gridRef}
        theme={myTheme}
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={paginationConfig.pageSize}
        paginationPageSizeSelector={paginationConfig.pageSizeSelector}
        suppressCellFocus={true}
        enableCellTextSelection={true}
        quickFilterText={quickFilterText}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default AgGridTable;
