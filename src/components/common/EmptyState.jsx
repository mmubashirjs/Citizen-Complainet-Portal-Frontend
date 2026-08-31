import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No complaints found",
  message = "Try changing your filters or report a new issue to get started.",
  actionText,
  onAction
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3.5rem 1.5rem',
      textAlign: 'center',
      backgroundColor: 'var(--white)',
      borderRadius: 'var(--radius-md)',
      border: '1px border var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      margin: '1.5rem 0'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', marginBottom: actionText ? '1.25rem' : '0' }}>
        {message}
      </p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
