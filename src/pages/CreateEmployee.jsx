import "../styles/pages/CreateEmployee.css";
import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import Link from '../components/Link';
import Button from '../components/Button';
import CustomDatePicker from '../components/DatePicker';
import Select from '../components/Select';
import SuccessModal from '../components/SuccessModal';
import { US_STATES, DEPARTMENTS } from '../constants/formOptions';
import { formatDateToUS } from '../utils/dateUtils';

function CreateEmployee() {
  const { createEmployee } = useEmployees();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdEmployeeData, setCreatedEmployeeData] = useState(null);

  // Validation functions for each field
  const validateFirstName = (value) => {
    if (!value || value.trim().length === 0) {
      return 'First name is required';
    }
    if (value.trim().length < 2) {
      return 'First name must contain at least 2 characters';
    }
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return 'First name must contain only letters, spaces, hyphens and apostrophes';
    }
    return '';
  };

  const validateLastName = (value) => {
    if (!value || value.trim().length === 0) {
      return 'Last name is required';
    }
    if (value.trim().length < 2) {
      return 'Last name must contain at least 2 characters';
    }
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return 'Last name must contain only letters, spaces, hyphens and apostrophes';
    }
    return '';
  };

  const validateDateOfBirth = (date) => {
    if (!date) {
      return ''; // Optionnel
    }
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (birthDate > today) {
      return 'Date of birth cannot be in the future';
    }
    if (age < 16) {
      return 'Employee must be at least 16 years old';
    }
    if (age > 120) {
      return 'Please verify the date of birth';
    }
    return '';
  };

  const validateStartDate = (date) => {
    if (!date) {
      return ''; // Optionnel
    }
    const today = new Date();
    const startDate = new Date(date);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (startDate < oneYearAgo) {
      return 'Start date cannot be more than one year ago';
    }
    return '';
  };

  const validateStreet = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    if (value.trim().length < 5) {
      return 'Street address must contain at least 5 characters';
    }
    if (!/^[a-zA-Z0-9À-ÿ\s,.-]+$/.test(value)) {
      return 'Street address contains invalid characters';
    }
    return '';
  };

  const validateCity = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    if (value.trim().length < 2) {
      return 'City must contain at least 2 characters';
    }
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return 'City must contain only letters, spaces, hyphens and apostrophes';
    }
    return '';
  };

  const validateState = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    const validStates = US_STATES.map(state => state.value);
    if (!validStates.includes(value)) {
      return 'Please select a valid state';
    }
    return '';
  };

  const validateZipCode = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    if (!/^\d{5}(-\d{4})?$/.test(value)) {
      return 'Zip code must be in format 12345 or 12345-6789';
    }
    return '';
  };

  const validateDepartment = (value) => {
    if (!value || value.trim().length === 0) {
      return 'Department is required';
    }
    const validDepartments = DEPARTMENTS.map(dept => dept.value);
    if (!validDepartments.includes(value)) {
      return 'Please select a valid department';
    }
    return '';
  };

  // Validation for all fields
  const validateAllFields = (data) => {
    const newErrors = {};

    newErrors.firstName = validateFirstName(data.firstName);
    newErrors.lastName = validateLastName(data.lastName);
    newErrors.dateOfBirth = validateDateOfBirth(data.dateOfBirth);
    newErrors.startDate = validateStartDate(data.startDate);
    newErrors.street = validateStreet(data.street);
    newErrors.city = validateCity(data.city);
    newErrors.state = validateState(data.state);
    newErrors.zipCode = validateZipCode(data.zipCode);
    newErrors.department = validateDepartment(data.department);

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    return newErrors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as "touched" and validate
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate specific field
    let error = '';
    switch (name) {
      case 'firstName':
        error = validateFirstName(value);
        break;
      case 'lastName':
        error = validateLastName(value);
        break;
      case 'street':
        error = validateStreet(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      case 'state':
        error = validateState(value);
        break;
      case 'zipCode':
        error = validateZipCode(value);
        break;
      case 'department':
        error = validateDepartment(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: date
    }));

    // Mark field as "touched" and validate
    setTouched(prev => ({ ...prev, [fieldName]: true }));

    let error = '';
    if (fieldName === 'dateOfBirth') {
      error = validateDateOfBirth(date);
    } else if (fieldName === 'startDate') {
      error = validateStartDate(date);
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Mark all fields as "touched"
    const allFields = ['firstName', 'lastName', 'dateOfBirth', 'startDate', 'street', 'city', 'state', 'zipCode', 'department'];
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    // Validate all fields
    const validationErrors = validateAllFields(formData);
    setErrors(validationErrors);

    // Check for validation errors
    if (Object.keys(validationErrors).length > 0) {
      alert('Please correct the errors in the form before submitting.');
      return;
    }

    // Format dates for storage (MM/DD/YYYY)
    const employeeData = {
      ...formData,
      dateOfBirth: formatDateToUS(formData.dateOfBirth),
      startDate: formatDateToUS(formData.startDate)
    };

    // Create employee via Redux
    createEmployee(employeeData);

    // Store data for display in modal
    setCreatedEmployeeData(employeeData);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: ''
    });
    setErrors({});
    setTouched({});

    // Show success modal
    setShowSuccessModal(true);
  };

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
        <form className="create-employee__form" onSubmit={handleSubmit}>
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
