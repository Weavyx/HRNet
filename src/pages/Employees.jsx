/**
 * @fileoverview Page de consultation des employés avec tableau et recherche.
 */

import '../styles/pages/Employees.css';
import { useEmployees } from '../hooks/useEmployees';
import Link from '../components/Link';
import ConditionalTable from '../components/ConditionalTable';
import { useState, useCallback } from 'react';

/**
 * Page d'affichage et de gestion des employés.
 * Contient un tableau de données avec fonctionnalité de recherche rapide.
 *
 * @component
 * @returns {React.ReactElement} Page avec tableau des employés et recherche
 *
 * @example
 * // Utilisé dans le routeur
 * <Route path="/employees" element={<Employees />} />
 */
function Employees() {
    const { employees } = useEmployees();
    const [quickFilterText, setQuickFilterText] = useState('');

    /**
     * @description Stratégie de chargement à plusieurs niveaux :
     *
     * 1. **Niveau Router (Suspense)** :
     *    - Affiche PageLoader pendant le chargement du composant Employees (lazy loading)
     *    - Message: "Loading employees..."
     *
     * 2. **Niveau Composant (ConditionalTable)** :
     *    - Aucun employé (length === 0) : Affiche l'état vide immédiatement
     *    - Employés présents : Affiche le loader de table pendant le chargement d'AG Grid (lazy loading)
     *    - Message: "Loading table..."
     *
     * Cette approche crée une expérience de chargement fluide :
     * Chargement Page → Employees → (si données) → AG Grid Table
     */

    /**
     * Gestionnaire de préparation de la grille AG Grid.
     * Optimisé avec useCallback pour éviter les re-rendus inutiles.
     */
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