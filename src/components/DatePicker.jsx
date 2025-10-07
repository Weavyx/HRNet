import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/DatePicker.css';

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
      calendarStartDay={1} // Commence la semaine par lundi
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="react-datepicker__header-custom">
          <button
            type="button"
            className="react-datepicker__navigation react-datepicker__navigation--previous"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            aria-label="Previous month"
          >
            <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
            </span>
          </button>

          <div className="react-datepicker__header-dropdowns">
            <select
              className="react-datepicker__month-select"
              value={date.getMonth()}
              onChange={(e) => changeMonth(parseInt(e.target.value))}
              aria-label="Select month"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2000, i).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>

            <select
              className="react-datepicker__year-select"
              value={date.getFullYear()}
              onChange={(e) => changeYear(parseInt(e.target.value))}
              aria-label="Select year"
            >
              {(() => {
                const currentYear = new Date().getFullYear();
                let startYear, endYear;

                // Déterminer la plage d'années selon les contraintes
                if (maxDate && !minDate) {
                  // Pour date de naissance (maxDate = aujourd'hui)
                  startYear = currentYear - 100; // 100 ans en arrière
                  endYear = Math.min(currentYear, maxDate.getFullYear());
                } else if (minDate && !maxDate) {
                  // Pour date de début (minDate peut être dans le passé)
                  startYear = Math.min(currentYear - 2, minDate.getFullYear());
                  endYear = currentYear + 10; // 10 ans dans le futur
                } else {
                  // Plage par défaut
                  startYear = currentYear - 80;
                  endYear = currentYear + 20;
                }

                const years = [];
                for (let year = startYear; year <= endYear; year++) {
                  years.push(
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                }
                return years;
              })()}
            </select>
          </div>

          <button
            type="button"
            className="react-datepicker__navigation react-datepicker__navigation--next"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            aria-label="Next month"
          >
            <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
            </span>
          </button>
        </div>
      )}
      {...props}
    />
  );
};

export default CustomDatePicker;