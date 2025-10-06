import Modal from './Modal';
import Button from './Button';
import Link from './Link';

function SuccessModal({
  isOpen,
  onClose,
  employeeData,
  onViewEmployees,
  onCreateAnother
}) {
  if (!employeeData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Non renseigné';
    return dateString;
  };

  const formatDepartment = (dept) => {
    return dept || 'Non renseigné';
  };

  const formatAddress = (street, city, state, zipCode) => {
    const parts = [];
    if (street) parts.push(street);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (zipCode) parts.push(zipCode);

    return parts.length > 0 ? parts.join(', ') : 'Non renseignée';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Employé créé avec succès !"
      className="modal--success"
    >
      <div className="success-message">
        <div className="success-message__icon">
          ✓
        </div>

        <h3 className="success-message__title">
          Félicitations !
        </h3>

        <p className="success-message__description">
          Le nouvel employé a été ajouté avec succès à votre base de données.
          Vous pouvez maintenant consulter la liste des employés ou créer un nouvel employé.
        </p>

        <div className="success-message__employee-info">
          <div className="employee-info__row">
            <span className="employee-info__label">Nom complet :</span>
            <span className="employee-info__value">
              {employeeData.firstName} {employeeData.lastName}
            </span>
          </div>

          <div className="employee-info__row">
            <span className="employee-info__label">Département :</span>
            <span className="employee-info__value">
              {formatDepartment(employeeData.department)}
            </span>
          </div>

          {employeeData.dateOfBirth && (
            <div className="employee-info__row">
              <span className="employee-info__label">Date de naissance :</span>
              <span className="employee-info__value">
                {formatDate(employeeData.dateOfBirth)}
              </span>
            </div>
          )}

          {employeeData.startDate && (
            <div className="employee-info__row">
              <span className="employee-info__label">Date de début :</span>
              <span className="employee-info__value">
                {formatDate(employeeData.startDate)}
              </span>
            </div>
          )}

          <div className="employee-info__row">
            <span className="employee-info__label">Adresse :</span>
            <span className="employee-info__value">
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
            to="/employee-list"
            variant="primary"
            size="medium"
            onClick={() => {
              if (onViewEmployees) onViewEmployees();
              onClose();
            }}
          >
            Voir les employés
          </Link>

          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              if (onCreateAnother) onCreateAnother();
              onClose();
            }}
          >
            Créer un autre employé
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessModal;