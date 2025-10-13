/**
 * @fileoverview Composant de chargement de page avec spinner animé.
 */

import '../styles/components/PageLoader.css';

/**
 * Composant de chargement avec spinner et message personnalisable.
 * Utilisé pour indiquer le chargement de pages ou de données.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.message='Loading...'] - Message à afficher pendant le chargement
 * @returns {React.ReactElement} Composant de chargement avec spinner
 *
 * @example
 * <PageLoader message="Chargement des employés..." />
 */
const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="page-loader">
      <div className="page-loader__container">
        <div className="page-loader__spinner">
          <div className="page-loader__spinner-inner"></div>
        </div>
        <div className="page-loader__message">{message}</div>
      </div>
    </div>
  );
};

export default PageLoader;