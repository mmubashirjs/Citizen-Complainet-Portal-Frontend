import React from 'react';
import './Form.css';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  required = false,
  className = '',
  placeholder = 'Select an option',
  ...props
}) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <select className="form-select" {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {error && <span className="form-error-msg">{error}</span>}
      {!error && helperText && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};
