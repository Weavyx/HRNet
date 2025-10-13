/**
 * @fileoverview Composant de pied de page de l'application.
 */

import '../styles/components/Footer.css';

/**
 * Composant de pied de page avec informations de copyright.
 *
 * @component
 * @returns {React.ReactElement} Pied de page avec copyright
 *
 * @example
 * <Footer />
 */
function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2025 HRNet. All rights reserved.</p>
        </footer>
    );
}
export default Footer;