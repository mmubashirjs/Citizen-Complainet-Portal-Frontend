import React from 'react';
import './StatCard.css';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary', // 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
  className = ''
}) => {
  return (
    <div className={`stat-card stat-card-${color} ${className}`}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon-wrap">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value font-number">{value}</span>
        {trend && <span className="stat-card-trend">{trend}</span>}
      </div>
      {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
    </div>
  );
};
