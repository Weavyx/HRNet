/**
 * @fileoverview Page de création d'employé avec formulaire de validation complet.
 */

import "../styles/pages/CreateEmployee.css";
import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useFormValidation } from '../hooks/useFormValidation';
import Link from '../components/Link';
import Button from '../components/Button';
import CustomDatePicker from '../components/DatePicker';
import Select from '../components/Select';
import SuccessModal from '../components/SuccessModal';
import { US_STATES, DEPARTMENTS } from '../constants/formOptions';
import { formatDateToUS } from '../utils/dateUtils';

/**
 * Page de création d'un nouvel employé.
 * Contient un formulaire complet avec validation, gestion d'erreurs et modal de succès.
 *
 * @component
 * @returns {React.ReactElement} Page de formulaire de création d'employé
 *
 * @example
 * // Utilisé dans le routeur
 * <Route path="/create-employee" element={<CreateEmployee />} />
 */
function CreateEmployee() {
  const { createEmployee } = useEmployees();

  // Utilisation du hook de validation avec les données initiales
  const initialFormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  };

  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleDateChange,
    handleSubmit,
    reset,
  } = useFormValidation(initialFormData);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdEmployeeData, setCreatedEmployeeData] = useState(null);

  /**
   * Gestionnaire de changement pour les champs de saisie.
   * Utilise le handleChange du hook de validation.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  /**
   * Gestionnaire de soumission du formulaire.
   * Utilise le handleSubmit du hook avec logique métier spécifique.
   */
  const onSubmit = handleSubmit((formValues) => {
    // Format dates for storage (MM/DD/YYYY)
    const employeeData = {
      ...formValues,
      dateOfBirth: formatDateToUS(formValues.dateOfBirth),
      startDate: formatDateToUS(formValues.startDate),
    };

    // Create employee via Redux
    createEmployee(employeeData);

    // Store data for display in modal
    setCreatedEmployeeData(employeeData);

    // Reset form
    reset();

    // Show success modal
    setShowSuccessModal(true);
  });

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setCreatedEmployeeData(null);
  };

  const handleCreateAnother = () => {
    // Form is already reset, no need to do it again
    setShowSuccessModal(false);
    setCreatedEmployeeData(null);
  };

  const handleViewEmployees = () => {
    // Navigation will be handled via Link in SuccessModal
    setShowSuccessModal(false);
    setCreatedEmployeeData(null);
  };

  return (
    <>
      <div className="create-employee">
        <Link to="/employees" variant="secondary" size="medium">
          View Current Employees
        </Link>
        <h2 className="create-employee__title">Create Employee</h2>
        <form className="create-employee__form" onSubmit={onSubmit}>
          <div className="create-employee__field">
            <label htmlFor="first-name" className="create-employee__label">First Name *</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              className={`create-employee__input ${errors.firstName && touched.firstName ? 'create-employee__input--error' : ''}`}
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && touched.firstName && (
              <span className="create-employee__error">{errors.firstName}</span>
            )}
          </div>

          <div className="create-employee__field">
            <label htmlFor="last-name" className="create-employee__label">Last Name *</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              className={`create-employee__input ${errors.lastName && touched.lastName ? 'create-employee__input--error' : ''}`}
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            {errors.lastName && touched.lastName && (
              <span className="create-employee__error">{errors.lastName}</span>
            )}
          </div>

          <div className="create-employee__field">
            <label htmlFor="date-of-birth" className="create-employee__label">Date of Birth</label>
            <CustomDatePicker
              id="date-of-birth"
              selected={formData.dateOfBirth}
              onChange={(date) => handleDateChange(date, 'dateOfBirth')}
              placeholderText="Select birth date..."
              maxDate={new Date()}
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              className={errors.dateOfBirth && touched.dateOfBirth ? 'create-employee__input--error' : ''}
            />
            {errors.dateOfBirth && touched.dateOfBirth && (
              <span className="create-employee__error">{errors.dateOfBirth}</span>
            )}
          </div>

          <div className="create-employee__field">
            <label htmlFor="start-date" className="create-employee__label">Start Date</label>
            <CustomDatePicker
              id="start-date"
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              placeholderText="Select start date..."
              minDate={(() => {
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                return oneYearAgo;
              })()}
              className={errors.startDate && touched.startDate ? 'create-employee__input--error' : ''}
            />
            {errors.startDate && touched.startDate && (
              <span className="create-employee__error">{errors.startDate}</span>
            )}
          </div>

          <fieldset className="create-employee__fieldset">
            <legend className="create-employee__legend">Address</legend>

            <div className="create-employee__field">
              <label htmlFor="street" className="create-employee__label">Street</label>
              <input
                id="street"
                type="text"
                name="street"
                className={`create-employee__input ${errors.street && touched.street ? 'create-employee__input--error' : ''}`}
                value={formData.street}
                onChange={handleInputChange}
              />
              {errors.street && touched.street && (
                <span className="create-employee__error">{errors.street}</span>
              )}
            </div>

            <div className="create-employee__field">
              <label htmlFor="city" className="create-employee__label">City</label>
              <input
                id="city"
                type="text"
                name="city"
                className={`create-employee__input ${errors.city && touched.city ? 'create-employee__input--error' : ''}`}
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && touched.city && (
                <span className="create-employee__error">{errors.city}</span>
              )}
            </div>

            <div className="create-employee__field">
              <label htmlFor="state" className="create-employee__label">State</label>
              <Select
                id="state"
                name="state"
                options={US_STATES}
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Select State"
                searchable={true}
                className={`create-employee__select ${errors.state && touched.state ? 'create-employee__select--error' : ''}`}
              />
              {errors.state && touched.state && (
                <span className="create-employee__error">{errors.state}</span>
              )}
            </div>

            <div className="create-employee__field">
              <label htmlFor="zip-code" className="create-employee__label">Zip Code</label>
              <input
                id="zip-code"
                type="text"
                name="zipCode"
                className={`create-employee__input ${errors.zipCode && touched.zipCode ? 'create-employee__input--error' : ''}`}
                value={formData.zipCode}
                onChange={handleInputChange}
                pattern="^\d{5}(-\d{4})?$"
                placeholder="12345 or 12345-6789"
              />
              {errors.zipCode && touched.zipCode && (
                <span className="create-employee__error">{errors.zipCode}</span>
              )}
            </div>
          </fieldset>

          <div className="create-employee__field">
            <label htmlFor="department" className="create-employee__label">Department *</label>
            <Select
              id="department"
              name="department"
              options={DEPARTMENTS}
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Select Department"
              searchable={false}
              className={`create-employee__select ${errors.department && touched.department ? 'create-employee__select--error' : ''}`}
            />
            {errors.department && touched.department && (
              <span className="create-employee__error">{errors.department}</span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="create-employee__button"
          >
            Save
          </Button>
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        employeeData={createdEmployeeData}
        onViewEmployees={handleViewEmployees}
        onCreateAnother={handleCreateAnother}
      />
    </>
  );
}

export default CreateEmployee;
