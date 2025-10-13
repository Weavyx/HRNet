/**
 * @fileoverview Composant Select personnalisé avec recherche et accessibilité.
 */

import { useState, useRef, useMemo, useCallback } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  FocusableItem,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '../styles/components/Select.css';

/**
 * Composant Select accessible avec fonctionnalité de recherche optionnelle.
 * Utilise @szhsin/react-menu pour l'accessibilité et la gestion du clavier.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Array<{value: string, label: string}>} [props.options=[]] - Liste des options disponibles
 * @param {string} [props.value=''] - Valeur sélectionnée actuelle
 * @param {Function} props.onChange - Fonction appelée lors du changement de sélection
 * @param {string} [props.placeholder='Select an option...'] - Texte de placeholder
 * @param {boolean} [props.searchable=false] - Active la fonctionnalité de recherche
 * @param {string} [props.className=''] - Classes CSS additionnelles
 * @param {string} [props.id] - ID HTML du composant
 * @param {string} [props.name] - Nom HTML du composant
 * @param {...Object} props - Autres propriétés HTML
 * @returns {React.ReactElement} Composant Select avec menu déroulant
 *
 * @example
 * <Select
 *   options={[{value: 'fr', label: 'France'}, {value: 'us', label: 'USA'}]}
 *   value={selectedCountry}
 *   onChange={(option) => setSelectedCountry(option.value)}
 *   searchable={true}
 *   placeholder="Choisir un pays..."
 * />
 */
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

  /**
   * Filtre les options basé sur le terme de recherche.
   * Optimisé avec useMemo pour éviter les recalculs inutiles.
   */
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    const lowerSearch = searchTerm.toLowerCase();
    return options.filter(option =>
      option.label.toLowerCase().includes(lowerSearch),
    );
  }, [searchable, searchTerm, options]);

  /**
   * Trouve l'option actuellement sélectionnée.
   * Optimisé avec useMemo pour éviter les recherches répétées.
   */
  const selectedOption = useMemo(() =>
    options.find(option => option.value === value),
    [options, value],
  );

  /**
   * Gestionnaire de clic sur un élément du menu.
   * Optimisé avec useCallback pour éviter les re-rendus inutiles.
   */
  const handleItemClick = useCallback((option) => {
    if (onChange) {
      // Simuler un événement de changement comme un select natif
      const mockEvent = {
        target: {
          name,
          value: option.value,
        },
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