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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Employee created successfully!"
      className="modal--success"
    >
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
          <div className="employee-info__row">
            <span className="employee-info__label">Full name:</span>
            <span className="employee-info__value">
              {employeeData.firstName} {employeeData.lastName}
            </span>
          </div>

          <div className="employee-info__row">
            <span className="employee-info__label">Department:</span>
            <span className="employee-info__value">
              {formatDepartment(employeeData.department)}
            </span>
          </div>

          {employeeData.dateOfBirth && (
            <div className="employee-info__row">
              <span className="employee-info__label">Date of birth:</span>
              <span className="employee-info__value">
                {formatDate(employeeData.dateOfBirth)}
              </span>
            </div>
          )}

          {employeeData.startDate && (
            <div className="employee-info__row">
              <span className="employee-info__label">Start date:</span>
              <span className="employee-info__value">
                {formatDate(employeeData.startDate)}
              </span>
            </div>
          )}

          <div className="employee-info__row">
            <span className="employee-info__label">Address:</span>
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
    </Modal>
  );
}

export default SuccessModal;