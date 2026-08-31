import React from 'react';

export const LoadingState = ({ count = 3, type = 'card' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', margin: '1rem 0' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            height: type === 'card' ? '140px' : '48px',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #F0F4F2 25%, #E4E9E6 50%, #F0F4F2 75%)',
              backgroundSize: '200% 100%',
              animation: 'skeletonLoading 1.5s infinite'
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes skeletonLoading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
