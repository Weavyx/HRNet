/**
 * @fileoverview Composant DatePicker personnalisé basé sur react-datepicker.
 */

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/DatePicker.css';

/**
 * Composant de sélecteur de date personnalisé avec styling intégré.
 * Encapsule react-datepicker avec des styles et configurations par défaut.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Date|null} props.selected - La date sélectionnée
 * @param {Function} props.onChange - Fonction appelée lors du changement de date
 * @param {string} [props.className=''] - Classes CSS additionnelles
 * @param {string} [props.placeholderText='Select date...'] - Texte de placeholder
 * @param {string} [props.dateFormat='MM/dd/yyyy'] - Format d'affichage de la date
 * @param {Date|null} [props.maxDate=null] - Date maximum sélectionnable
 * @param {Date|null} [props.minDate=null] - Date minimum sélectionnable
 * @param {string} [props.id] - ID HTML du champ
 * @param {string} [props.name] - Nom HTML du champ
 * @param {...Object} props - Autres propriétés passées à react-datepicker
 * @returns {React.ReactElement} Composant de sélection de date
 *
 * @example
 * <CustomDatePicker
 *   selected={birthDate}
 *   onChange={(date) => setBirthDate(date)}
 *   maxDate={new Date()}
 *   placeholderText="Select birth date"
 * />
 */
const CustomDatePicker = ({
  selected,
  onChange,
  className = '',
  placeholderText = 'Select date...',
  dateFormat = 'MM/dd/yyyy',
  maxDate = null,
  minDate = null,
  id,
  name,
  ...props
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      className={`create-employee__input ${className}`}
      placeholderText={placeholderText}
      dateFormat={dateFormat}
      maxDate={maxDate}
      minDate={minDate}
      id={id}
      name={name}
      showYearDropdown
      yearDropdownItemNumber={50}
      scrollableYearDropdown
      showMonthDropdown
      dropdownMode="select"
      autoComplete="off"
      showPopperArrow={false}
      calendarStartDay={0} // Commence la semaine par Dimanche
      {...props}
    />
  );
};

export default CustomDatePicker;