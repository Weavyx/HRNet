/**
 * @fileoverview Composant bouton réutilisable avec support de variantes et tailles.
 */

import '../styles/components/Button.css';

/**
 * Composant bouton personnalisable avec variantes et tailles.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Le contenu du bouton
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary'] - La variante de style du bouton
 * @param {('small'|'medium'|'large')} [props.size='medium'] - La taille du bouton
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Le type HTML du bouton
 * @param {Function} [props.onClick] - Gestionnaire de clic
 * @param {boolean} [props.disabled=false] - Si le bouton est désactivé
 * @param {string} [props.className=''] - Classes CSS additionnelles
 * @param {...Object} props - Autres propriétés HTML passées au bouton
 * @returns {React.ReactElement} Élément bouton stylé
 *
 * @example
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Cliquer ici
 * </Button>
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`;

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;