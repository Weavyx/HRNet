import '../styles/components/PageLoader.css';

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