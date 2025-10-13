import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { useMemo, useRef } from 'react';
import '../styles/components/AgGridTable.css';

/**
 * Enregistre les modules AG Grid Community.
 * Cette opération est effectuée une seule fois au niveau du module.
 * @see {@link https://ag-grid.com/javascript-data-grid/modules/}
 */
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Composant de tableau de données utilisant AG Grid React.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.employees - Liste des employés à afficher dans le tableau
 * @param {string} [props.quickFilterText] - Texte de filtrage rapide pour rechercher dans toutes les colonnes
 * @param {Function} [props.onGridReady] - Callback appelé lorsque la grille est prête
 * @returns {React.ReactElement} Composant de tableau AG Grid configuré
 *
 * @example
 * <AgGridTable
 *   employees={employeesList}
 *   quickFilterText={searchTerm}
 *   onGridReady={(params) => console.log('Grid ready', params)}
 * />
 */
const AgGridTable = ({ employees, quickFilterText, onGridReady }) => {
  const gridRef = useRef();

  /**
   * Configuration du thème personnalisé pour AG Grid v34.
   * Utilise la nouvelle API de thématisation avec des noms de parts corrects.
   * @type {import('ag-grid-community').Theme}
   * @see {@link https://ag-grid.com/javascript-data-grid/themes/}
   */
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

  /**
   * Définitions des colonnes avec filtres natifs AG Grid.
   * Configure les colonnes avec leurs propriétés de tri, filtrage et affichage.
   * @type {import('ag-grid-community').ColDef[]}
   */
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
      hide: false,
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
      hide: false,
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
      hide: window.innerWidth < 768,
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
      hide: false,
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
      hide: window.innerWidth < 1024,
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
      hide: false, // Toujours visible
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
      hide: window.innerWidth < 992,
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
      hide: false, // Toujours visible
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
      hide: false, // Toujours visible
    },
  ], []);

  /**
   * Configuration par défaut pour toutes les colonnes.
   * Définit les comportements communs comme le redimensionnement, le tri et le filtrage.
   * @type {import('ag-grid-community').ColDef}
   */
  const defaultColDef = useMemo(() => (
    {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: false, // Désactiver les floating filters pour un affichage compact
    minWidth: 100,
  }
), []);

  /**
   * Configuration adaptative de la pagination basée sur la taille d'écran.
   * Optimise l'expérience utilisateur sur mobile en réduisant le nombre d'éléments par page.
   * @type {Object}
   * @property {number} pageSize - Nombre d'éléments par page
   * @property {number[]} pageSizeSelector - Options de taille de page disponibles
   */
  const paginationConfig = useMemo(() => {
    const isMobile = window.innerWidth < 480;
    return {
      pageSize: isMobile ? 5 : 10, /** Moins d'éléments par page sur mobile */
      pageSizeSelector: isMobile ? [5, 10, 20] : [5, 10, 20, 50, 100], /** Options simplifiées sur mobile */
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
