/**
 * @fileoverview Composant racine de l'application HRNet.
 */

import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

/**
 * Composant principal de l'application HRNet.
 * Définit la structure globale avec Header, contenu principal (Outlet) et Footer.
 *
 * @component
 * @returns {React.ReactElement} Structure principale de l'application
 *
 * @example
 * // Utilisé comme composant racine dans le routeur
 * <App />
 */
const App = () => (
  <>
    <Header />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default App;
