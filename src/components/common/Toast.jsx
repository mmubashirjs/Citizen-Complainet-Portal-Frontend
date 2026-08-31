import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import './Toast.css';

export const Toast = ({ toast, onClose }) => {
  const { message, type } = toast;

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="toast-icon" size={20} />;
      case 'error':
        return <XCircle className="toast-icon" size={20} />;
      case 'warning':
        return <AlertCircle className="toast-icon" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon" size={20} />;
    }
  };

  return (
    <div className={`toast toast-${type} animate-fade-in`}>
      {renderIcon()}
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};
