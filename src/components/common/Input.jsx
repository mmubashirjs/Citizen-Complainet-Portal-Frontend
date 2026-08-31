import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Form.css';

export const Input = ({
  label,
  type = 'text',
  error,
  helperText,
  icon: Icon,
  required = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon-left" size={18} />}
        <input
          type={inputType}
          className={`form-input ${Icon ? 'has-left-icon' : ''} ${isPassword ? 'has-right-icon' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="input-icon-right-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="form-error-msg">{error}</span>}
      {!error && helperText && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};
