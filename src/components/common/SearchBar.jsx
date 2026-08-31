import React from 'react';
import { Search, X } from 'lucide-react';
import './Form.css';

export const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = "Search complaints...",
  className = ''
}) => {
  return (
    <div className={`input-wrapper ${className}`} style={{ width: '100%' }}>
      <Search className="input-icon-left" size={18} />
      <input
        type="text"
        className="form-input has-left-icon"
        style={{ paddingRight: value ? '2.5rem' : '1rem' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          className="input-icon-right-btn"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
