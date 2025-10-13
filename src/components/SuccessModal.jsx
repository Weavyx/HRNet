import { useEffect } from 'react';
import Button from './Button';
import Link from './Link';
import '../styles/components/SuccessModal.css';

function SuccessModal({
  isOpen,
  onClose,
  employeeData,
  onViewEmployees,
  onCreateAnother
}) {
  // Gérer la fermeture avec la touche Échap
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Gérer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ne pas rendre si la modale n'est pas ouverte ou sans données
  if (!isOpen || !employeeData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return dateString;
  };

  const formatDepartment = (dept) => {
    return dept || 'Not provided';
  };

  const formatAddress = (street, city, state, zipCode) => {
    const parts = [];
    if (street) parts.push(street);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (zipCode) parts.push(zipCode);

    return parts.length > 0 ? parts.join(', ') : 'Not provided';
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="success-modal-overlay" onClick={handleOverlayClick}>
      <div className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
        <div className="success-modal__header">
          <h2 id="success-modal-title" className="success-modal__title">
            Employee created successfully!
          </h2>
          <button
            type="button"
            className="success-modal__close-button"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            <span className="success-modal__close-icon">×</span>
          </button>
        </div>

        <div className="success-modal__content">
          <div className="success-message">
        <div className="success-message__icon">
          ✓
        </div>

        <h3 className="success-message__title">
          Congratulations!
        </h3>

        <p className="success-message__description">
          The new employee has been successfully added to your database.
          You can now view the employee list or create another employee.
        </p>

        <div className="success-message__employee-info">
          <div className="success-message__info-row">
            <span className="success-message__info-label">Full name:</span>
            <span className="success-message__info-value">
              {employeeData.firstName} {employeeData.lastName}
            </span>
          </div>

          <div className="success-message__info-row">
            <span className="success-message__info-label">Department:</span>
            <span className="success-message__info-value">
              {formatDepartment(employeeData.department)}
            </span>
          </div>

          {employeeData.dateOfBirth && (
            <div className="success-message__info-row">
              <span className="success-message__info-label">Date of birth:</span>
              <span className="success-message__info-value">
                {formatDate(employeeData.dateOfBirth)}
              </span>
            </div>
          )}

          {employeeData.startDate && (
            <div className="success-message__info-row">
              <span className="success-message__info-label">Start date:</span>
              <span className="success-message__info-value">
                {formatDate(employeeData.startDate)}
              </span>
            </div>
          )}

          <div className="success-message__info-row">
            <span className="success-message__info-label">Address:</span>
            <span className="success-message__info-value">
              {formatAddress(
                employeeData.street,
                employeeData.city,
                employeeData.state,
                employeeData.zipCode
              )}
            </span>
          </div>
        </div>

        <div className="success-message__actions">
          <Link
            to="/employees"
            variant="primary"
            size="medium"
            onClick={() => {
              if (onViewEmployees) onViewEmployees();
              onClose();
            }}
          >
            View employees
          </Link>

          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              if (onCreateAnother) onCreateAnother();
              onClose();
            }}
          >
            Create another employee
          </Button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;