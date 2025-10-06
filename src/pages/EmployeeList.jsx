import '../styles/pages/EmployeeList.css';
import { useEmployees } from '../hooks/useEmployees';
import Link from '../components/Link';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';

// Enregistrement des modules AG Grid Community
ModuleRegistry.registerModules([AllCommunityModule]);

function EmployeeList() {
    const { employees } = useEmployees();

    // Configuration responsive des colonnes AG Grid
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
            headerName: 'Birth Date',
            filter: 'agDateColumnFilter',
            sortable: true,
            flex: 1,
            minWidth: 110,
            hide: window.innerWidth < 1024 // Masquer sur tablette et mobile
        },
        {
            field: 'street',
            headerName: 'Street',
            filter: true,
            sortable: true,
            flex: 1.2,
            minWidth: 150,
            hide: window.innerWidth < 1200 // Masquer sauf sur grand écran
        },
        {
            field: 'city',
            headerName: 'City',
            filter: true,
            sortable: true,
            flex: 0.8,
            minWidth: 90,
            hide: window.innerWidth < 480 // Masquer seulement sur très petit écran
        },
        {
            field: 'state',
            headerName: 'State',
            filter: true,
            sortable: true,
            flex: 0.7,
            minWidth: 80,
            hide: window.innerWidth < 640 // Masquer sur petit écran
        },
        {
            field: 'zipCode',
            headerName: 'Zip',
            filter: true,
            sortable: true,
            flex: 0.6,
            minWidth: 70,
            hide: window.innerWidth < 900 // Masquer sur écran moyen
        }
    ], []);

    // Configuration par défaut responsive d'AG Grid
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: false, // Désactiver sur mobile pour économiser l'espace
        suppressMenu: window.innerWidth < 480, // Simplifier le menu sur très petit écran
    }), []);

    return (
        <div className="employee-list">
            <Link to="/" variant="secondary" size="medium">
              ← Create New Employee
            </Link>
            <h2 className="employee-list__title">Current Employees ({employees.length})</h2>

            {employees.length === 0 ? (
                <p className="employee-list__empty">Aucun employé enregistré.</p>
            ) : (
                <div className="employee-list__grid-container ag-theme-alpine">
                    <AgGridReact
                        rowData={employees}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={window.innerWidth < 768 ? 5 : 10}
                        paginationPageSizeSelector={window.innerWidth < 768 ? [5, 10, 20] : [10, 25, 50, 100]}
                        animateRows={true}
                        rowSelection="multiple"
                        suppressRowClickSelection={true}
                        domLayout="normal"
                        suppressMenuHide={false}
                        enableCellTextSelection={true}
                        suppressRowTransform={false}
                        suppressColumnVirtualisation={window.innerWidth < 768}
                        suppressHorizontalScroll={false}
                        alwaysShowHorizontalScroll={false}
                        suppressLoadingOverlay={false}
                        suppressNoRowsOverlay={false}
                        loadingOverlayComponent={() => (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: 'var(--primary-color)',
                                fontWeight: 'bold'
                            }}>
                                🔄 Chargement des employés...
                            </div>
                        )}
                        noRowsOverlayComponent={() => (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: 'var(--text-secondary)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👥</div>
                                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    Aucun employé trouvé
                                </div>
                                <div>Ajoutez votre premier employé !</div>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>
    );
}
export default EmployeeList;