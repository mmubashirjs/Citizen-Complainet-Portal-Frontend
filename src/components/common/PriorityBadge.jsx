import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowDown, ArrowUp } from 'lucide-react';
import './Badges.css';

export const PriorityBadge = ({ priority = 'Low', showIcon = true, className = '' }) => {
  const normalized = priority ? priority.toLowerCase() : 'low';

  const renderIcon = () => {
    if (!showIcon) return null;
    switch (normalized) {
      case 'critical':
        return <ShieldAlert size={12} className="priority-icon" />;
      case 'high':
        return <AlertTriangle size={12} className="priority-icon" />;
      case 'medium':
        return <ArrowUp size={12} className="priority-icon" />;
      case 'low':
      default:
        return <ArrowDown size={12} className="priority-icon" />;
    }
  };

  return (
    <span className={`priority-badge priority-${normalized} ${className}`}>
      {renderIcon()}
      <span>{priority.toUpperCase()}</span>
    </span>
  );
};
