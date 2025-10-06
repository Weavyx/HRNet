import { Link as RouterLink } from 'react-router-dom';
import '../styles/components/Link.css';

const Link = ({
  children,
  to,
  variant = 'secondary',
  size = 'medium',
  className = '',
  external = false,
  ...props
}) => {
  const linkClass = `link link--${variant} link--${size} ${className}`;

  if (external) {
    return (
      <a
        href={to}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

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