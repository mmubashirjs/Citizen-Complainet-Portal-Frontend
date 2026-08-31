import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      gap: '1rem',
      padding: '1rem 0',
      marginTop: '1rem'
    }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Page {currentPage} of {totalPages}
      </span>
      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={ChevronLeft}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon={ChevronRight}
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
