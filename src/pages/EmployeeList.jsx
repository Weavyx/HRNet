import '../styles/pages/EmployeeList.css';
import { useEmployees } from '../hooks/useEmployees';
import Link from '../components/Link';
import ConditionalTable from '../components/ConditionalTable';
import { useState, useCallback } from 'react';

function EmployeeList() {
    const { employees } = useEmployees();
    const [quickFilterText, setQuickFilterText] = useState('');

    // Optimisation : Mémorisation du callback pour éviter les re-renders
    const handleGridReady = useCallback((params) => {
        console.log('AG Grid is ready', params);
    }, []);

    const handleQuickFilterChange = useCallback((e) => {
        setQuickFilterText(e.target.value);
    }, []);

    return (
        <div className="employee-list">
            <div className="employee-list__header">
                <h2 className="employee-list__title">Current Employees ({employees.length})</h2>

                <div className="employee-list__controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search in table..."
                            value={quickFilterText}
                            onChange={handleQuickFilterChange}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            <div className="employee-list__content">
                <ConditionalTable
                    employees={employees}
                    quickFilterText={quickFilterText}
                    onGridReady={handleGridReady}
                />
            </div>

            <div className="employee-list__footer">
                <Link to="/">Ajouter un employé</Link>
            </div>
        </div>
    );
}

export default EmployeeList;