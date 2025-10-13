/**
 * @fileoverview Composant d'en-tête principal de l'application.
 */

import "../styles/components/Header.css";

/**
 * Composant d'en-tête avec navigation principale.
 * Affiche le titre de l'application et les liens de navigation.
 *
 * @component
 * @returns {React.ReactElement} En-tête avec navigation
 *
 * @example
 * <Header />
 */
function Header() {
    return (
        <header className="header">
            <h1 className="header__title">HRNet</h1>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item"><a className="header__nav-link" href="/">Create Employee</a></li>
                    <li className="header__nav-item"><a className="header__nav-link" href="/employees">Employees</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;