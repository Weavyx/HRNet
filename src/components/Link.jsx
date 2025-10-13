import { Link as RouterLink } from 'react-router-dom';
import '../styles/components/Link.css';

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