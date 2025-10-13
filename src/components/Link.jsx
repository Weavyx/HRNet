/**
 * @fileoverview Composant de lien personnalisé basé sur React Router.
 */

import { Link as RouterLink } from 'react-router-dom';
import '../styles/components/Link.css';

/**
 * Composant de lien stylé utilisant React Router Link.
 * Encapsule RouterLink avec des variantes et tailles personnalisées.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Le contenu du lien
 * @param {string} props.to - L'URL de destination (React Router)
 * @param {('primary'|'secondary'|'danger')} [props.variant='secondary'] - La variante de style
 * @param {('small'|'medium'|'large')} [props.size='medium'] - La taille du lien
 * @param {string} [props.className=''] - Classes CSS additionnelles
 * @param {...Object} props - Autres propriétés passées à RouterLink
 * @returns {React.ReactElement} Lien React Router stylé
 *
 * @example
 * <Link to="/employees" variant="primary" size="large">
 *   Voir les employés
 * </Link>
 */
const Link = ({
  children,
  to,
  variant = 'secondary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const linkClass = `link link--${variant} link--${size} ${className}`;

  return (
    <RouterLink
      to={to}
      className={linkClass}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;