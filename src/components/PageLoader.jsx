import '../styles/components/PageLoader.css';

const PageLoader = ({ size = 'medium', message = 'Loading...', lightBackground = false }) => {
  const cssClasses = [
    'page-loader',
    `page-loader--${size}`,
    lightBackground ? 'page-loader--light-bg' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cssClasses}>
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