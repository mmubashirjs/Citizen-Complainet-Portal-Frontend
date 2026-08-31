import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the complaints. Please check your connection and try again.",
  onRetry
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      textAlign: 'center',
      backgroundColor: 'var(--white)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      margin: '1.5rem 0'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--priority-critical-bg)',
        color: 'var(--danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <AlertCircle size={30} />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '1.25rem' }}>
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" icon={RefreshCw} onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};
