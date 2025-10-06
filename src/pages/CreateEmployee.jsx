import "../styles/pages/CreateEmployee.css";
import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import Link from '../components/Link';
import Button from '../components/Button';
import CustomDatePicker from '../components/DatePicker';
import Select from '../components/Select';
import SuccessModal from '../components/SuccessModal';
import { US_STATES, DEPARTMENTS } from '../constants/formOptions';

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

  // Fonctions de validation pour chaque champ
  const validateFirstName = (value) => {
    if (!value || value.trim().length === 0) {
      return 'Le prénom est requis';
    }
    if (value.trim().length < 2) {
      return 'Le prénom doit contenir au moins 2 caractères';
    }
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return 'Le prénom ne doit contenir que des lettres, espaces, traits d\'union et apostrophes';
    }
    return '';
  };

  const validateLastName = (value) => {
    if (!value || value.trim().length === 0) {
      return 'Le nom est requis';
    }
    if (value.trim().length < 2) {
      return 'Le nom doit contenir au moins 2 caractères';
    }
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return 'Le nom ne doit contenir que des lettres, espaces, traits d\'union et apostrophes';
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
      return 'La date de naissance ne peut pas être dans le futur';
    }
    if (age < 16) {
      return 'L\'employé doit avoir au moins 16 ans';
    }
    if (age > 120) {
      return 'Veuillez vérifier la date de naissance';
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
      return 'La date de début ne peut pas être antérieure à un an';
    }
    return '';
  };

  const validateStreet = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    if (value.trim().length < 5) {
      return 'L\'adresse doit contenir au moins 5 caractères';
    }
    if (!/^[a-zA-Z0-9À-ÿ\s,.-]+$/.test(value)) {
      return 'L\'adresse contient des caractères non valides';
    }
    return '';
  };

  const validateCity = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    if (value.trim().length < 2) {
      return 'La ville doit contenir au moins 2 caractères';
    }
    if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
      return 'La ville ne doit contenir que des lettres, espaces, traits d\'union et apostrophes';
    }
    return '';
  };

  const validateState = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    const validStates = US_STATES.map(state => state.value);
    if (!validStates.includes(value)) {
      return 'Veuillez sélectionner un état valide';
    }
    return '';
  };

  const validateZipCode = (value) => {
    if (!value) {
      return ''; // Optionnel
    }
    if (!/^\d{5}(-\d{4})?$/.test(value)) {
      return 'Le code postal doit être au format 12345 ou 12345-6789';
    }
    return '';
  };

  const validateDepartment = (value) => {
    if (!value || value.trim().length === 0) {
      return 'Le département est requis';
    }
    const validDepartments = DEPARTMENTS.map(dept => dept.value);
    if (!validDepartments.includes(value)) {
      return 'Veuillez sélectionner un département valide';
    }
    return '';
  };

  // Validation de tous les champs
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

    // Supprime les erreurs vides
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

    // Marquer le champ comme "touché" et valider
    setTouched(prev => ({ ...prev, [name]: true }));

    // Valider le champ spécifique
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

    // Marquer le champ comme "touché" et valider
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

    // Marquer tous les champs comme "touchés"
    const allFields = ['firstName', 'lastName', 'dateOfBirth', 'startDate', 'street', 'city', 'state', 'zipCode', 'department'];
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    // Valider tous les champs
    const validationErrors = validateAllFields(formData);
    setErrors(validationErrors);

    // Vérifier s'il y a des erreurs
    if (Object.keys(validationErrors).length > 0) {
      alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
      return;
    }

    // Formater les dates pour l'enregistrement
    const employeeData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString('fr-FR') : '',
      startDate: formData.startDate ? formData.startDate.toLocaleDateString('fr-FR') : ''
    };

    // Créer l'employé via Redux
    createEmployee(employeeData);

    // Conserver les données pour affichage dans la modale
    setCreatedEmployeeData(employeeData);

    // Reset du formulaire
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

    // Afficher la modale de succès
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setCreatedEmployeeData(null);
  };

  const handleCreateAnother = () => {
    // Le formulaire est déjà réinitialisé, pas besoin de refaire
    setShowSuccessModal(false);
    setCreatedEmployeeData(null);
  };

  const handleViewEmployees = () => {
    // La navigation se fera via le Link dans SuccessModal
    setShowSuccessModal(false);
    setCreatedEmployeeData(null);
  };

  return (
    <>
      <div className="create-employee">
        <Link to="/employee-list" variant="secondary" size="medium">
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

      {/* Modale de succès */}
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
