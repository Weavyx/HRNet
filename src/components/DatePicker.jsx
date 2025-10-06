import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/DatePicker.css';

const CustomDatePicker = ({
  selected,
  onChange,
  className = '',
  placeholderText = 'Select date...',
  dateFormat = 'dd/MM/yyyy',
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
      yearDropdownItemNumber={100}
      scrollableYearDropdown
      showMonthDropdown
      dropdownMode="select"
      autoComplete="off"
      {...props}
    />
  );
};

export default CustomDatePicker;