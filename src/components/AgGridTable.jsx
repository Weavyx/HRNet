import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { useMemo, useRef } from 'react';

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

  return (
    <div className="employees__table" style={{ height: '400px', width: '100%' }}>
      <style>
        {`
          /* Styles optimisés pour un en-tête compact sans floating filters */
          .employees__table .ag-header {
            border-bottom: 2px solid #667eea;
          }

          /* Hauteur optimisée pour les en-têtes principaux */
          .employees__table .ag-header-row {
            height: 48px !important;
            min-height: 48px !important;
          }

          /* Styles pour les en-têtes de colonnes */
          .employees__table .ag-header-cell {
            border-right: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            padding: 0 12px;
          }

          /* Style des icônes de filtre dans les en-têtes */
          .employees__table .ag-header-icon {
            color: #6b7280;
            transition: color 0.2s ease;
          }

          .employees__table .ag-header-cell:hover .ag-header-icon {
            color: #667eea;
          }

          /* Styles pour les filtres et dropdowns */
          .ag-filter-wrapper {
            overflow: visible !important;
            z-index: 1000;
          }

          .ag-menu {
            overflow: visible !important;
            z-index: 1000;
          }

          .ag-popup {
            overflow: visible !important;
            z-index: 1000;
          }

          /* Styles pour les filtres natifs AG Grid */
          .ag-filter-body-wrapper {
            overflow: visible !important;
          }

          .ag-filter-body {
            overflow: visible !important;
          }

          /* Améliorer l'affichage des dropdowns de filtres */
          .ag-list-selection {
            z-index: 9999 !important;
          }

          .ag-picker-field-wrapper {
            z-index: 9999 !important;
          }

          /* Ajustements responsive pour les en-têtes */
          @media (max-width: 768px) {
            .employees__table .ag-header-row {
              height: 44px !important;
              min-height: 44px !important;
            }

            .employees__table .ag-header-cell {
              padding: 0 8px;
              font-size: 13px;
            }
          }
        `}
      </style>
      <AgGridReact
        ref={gridRef}
        theme={myTheme}
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 20, 50, 100]}
        suppressCellFocus={true}
        enableCellTextSelection={true}
        quickFilterText={quickFilterText}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default AgGridTable;
