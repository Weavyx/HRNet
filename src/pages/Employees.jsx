import '../styles/pages/Employees.css';
import { useEmployees } from '../hooks/useEmployees';
import Link from '../components/Link';
import ConditionalTable from '../components/ConditionalTable';
import { useState, useCallback } from 'react';

function Employees() {
    const { employees } = useEmployees();
    const [quickFilterText, setQuickFilterText] = useState('');

    /*
     * Loading Strategy Explanation:
     *
     * 1. Router Level (Suspense):
     *    - Shows PageLoader while Employees component loads (lazy loading)
     *    - Message: "Loading employees..."
     *
     * 2. Component Level (ConditionalTable):
     *    - No employees (length === 0): Show empty state immediately
     *    - Has employees: Show table loader while AG Grid loads (lazy loading)
     *    - Message: "Loading table..."
     *
     * This creates a smooth loading experience:
     * Page Load → Employees → (if data exists) → AG Grid Table
     */

    // Optimisation : Mémorisation du callback pour éviter les re-renders
    const handleGridReady = useCallback(() => {
        // Grid is ready - callback can be used for additional setup if needed
    }, []);

    const handleQuickFilterChange = useCallback((e) => {
        setQuickFilterText(e.target.value);
    }, []);

    return (
        <div className="employees">
            <div className="employees__header">
                <h2 className="employees__title">Current Employees ({employees.length})</h2>

                {employees.length > 0 && (
                    <div className="employees__controls">
                        <div className="employees__search-container">
                            <input
                                type="text"
                                placeholder="Search in table..."
                                value={quickFilterText}
                                onChange={handleQuickFilterChange}
                                className="employees__search-input"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="employees__content">
                <ConditionalTable
                    employees={employees}
                    quickFilterText={quickFilterText}
                    onGridReady={handleGridReady}
                />
            </div>

            <div className="employees__footer">
                <Link to="/">Add Employee</Link>
            </div>
        </div>
    );
}

export default Employees;