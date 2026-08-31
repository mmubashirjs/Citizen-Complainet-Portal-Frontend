import React from 'react';
import './Form.css';

export const Textarea = ({
  label,
  error,
  helperText,
  required = false,
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <textarea className="form-textarea" rows={rows} {...props} />
      {error && <span className="form-error-msg">{error}</span>}
      {!error && helperText && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};
