import { useState, useRef, useMemo, useCallback } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  FocusableItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '../styles/components/Select.css';

const Select = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option...',
  searchable = false,
  className = '',
  id,
  name,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // Filtrer les options si recherche activée - Optimisé avec useMemo
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    const lowerSearch = searchTerm.toLowerCase();
    return options.filter(option =>
      option.label.toLowerCase().includes(lowerSearch)
    );
  }, [searchable, searchTerm, options]);

  // Trouver l'option sélectionnée - Optimisé avec useMemo
  const selectedOption = useMemo(() =>
    options.find(option => option.value === value),
    [options, value]
  );

  // Handlers optimisés avec useCallback
  const handleItemClick = useCallback((option) => {
    if (onChange) {
      // Simuler un événement de changement comme un select natif
      const mockEvent = {
        target: {
          name,
          value: option.value
        }
      };
      onChange(mockEvent);
    }
    setSearchTerm('');
  }, [onChange, name]);

  const handleMenuToggle = useCallback((isMenuOpen) => {
    if (isMenuOpen && searchable && searchInputRef.current) {
      // Focus immédiat sans setTimeout pour plus de réactivité
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
    if (!isMenuOpen) {
      setSearchTerm('');
    }
  }, [searchable]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <Menu
      menuButton={
        <MenuButton
          className={`select-button ${className}`}
          id={id}
          {...props}
        >
          <span className="select-button__text">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="select-button__arrow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </MenuButton>
      }
      transition={{ open: true, close: false, item: false }}
      onMenuChange={handleMenuToggle}
      className="select-menu"
      menuClassName="select-menu-list"
    >
      {searchable && (
        <FocusableItem className="select-search-container">
          {({ ref }) => (
            <input
              ref={(node) => {
                ref.current = node;
                searchInputRef.current = node;
              }}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="select-search-input"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </FocusableItem>
      )}

      {filteredOptions.length === 0 ? (
        <MenuItem disabled className="select-menu-item select-menu-item--empty">
          No options found
        </MenuItem>
      ) : (
        filteredOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleItemClick(option)}
            className={`select-menu-item ${
              value === option.value ? 'select-menu-item--selected' : ''
            }`}
          >
            {option.label}
          </MenuItem>
        ))
      )}
    </Menu>
  );
};

export default Select;