import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'accent' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
        </>
      )}
    </button>
  );
};
