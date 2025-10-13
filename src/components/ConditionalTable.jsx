/**
 * @fileoverview Composant de table conditionnelle avec lazy loading optimisé.
 * Charge AgGridTable seulement si des employés sont présents pour optimiser les performances.
 */

import { lazy, Suspense } from 'react';
import '../styles/components/ConditionalTable.css';

/**
 * Chargement paresseux d'AgGridTable seulement quand nécessaire.
 * Optimise le bundle initial en ne chargeant AG Grid que si on a des données à afficher.
 */
const AgGridTable = lazy(() => import('./AgGridTable'));

/**
 * Composant de table avec chargement conditionnel et optimisé.
 * Affiche un état vide si aucun employé n'est présent, sinon charge le tableau AG Grid.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.employees - Liste des employés à afficher
 * @param {string} [props.quickFilterText] - Texte de filtrage rapide
 * @param {Function} [props.onGridReady] - Callback appelé quand la grille est prête
 * @returns {React.ReactElement} État vide ou tableau avec Suspense
 *
 * @example
 * <ConditionalTable
 *   employees={employeesList}
 *   quickFilterText={searchTerm}
 *   onGridReady={handleGridReady}
 * />
 */
const ConditionalTable = ({ employees, quickFilterText, onGridReady }) => {
  /** Si aucun employé n'est présent, éviter de charger AG Grid pour optimiser les performances */
  if (employees.length === 0) {
    return (
      <div className="employees__empty">
        <div className="employees__empty-icon">👥</div>
        <div className="employees__empty-title">
          Aucun employé trouvé
        </div>
        <div>Ajoutez votre premier employé !</div>
      </div>
    );
  }

  /** Charger AG Grid seulement si on a des données à afficher */
  return (
    <Suspense fallback={
      <div className="loading-table">
        <div className="loading-table__content">
          <div className="loading-table__spinner"></div>
          <span className="loading-table__message">
            Chargement du tableau de données...
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