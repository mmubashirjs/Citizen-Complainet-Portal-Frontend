import React from 'react';
import './Badges.css';

export const StatusBadge = ({ status = 'Pending', className = '' }) => {
  const normalized = status ? status.toLowerCase().replace(/\s+/g, '-') : 'pending';

  return (
    <span className={`status-badge status-${normalized} ${className}`}>
      <span className="status-dot" />
      <span>{status}</span>
    </span>
  );
};
