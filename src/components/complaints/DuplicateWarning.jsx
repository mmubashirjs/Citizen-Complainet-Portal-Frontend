import React from 'react';
import { AlertTriangle, ArrowUp } from 'lucide-react';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';

export const DuplicateWarning = ({
  matchedComplaint,
  onUpvoteInstead,
  onSubmitAnyway
}) => {
  if (!matchedComplaint) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: '#FFFBE6',
        border: '1.5px solid var(--accent)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-accent)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--text-main)',
          padding: '0.4rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <AlertTriangle size={22} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#664D00' }}>
            Similar Complaint Found
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#8C6C00' }}>
            A similar complaint in <strong>{matchedComplaint.category}</strong> has already been reported in <strong>{matchedComplaint.area}</strong>.
          </p>
        </div>
      </div>

      {/* Matched Complaint Details Card */}
      <div style={{
        backgroundColor: 'var(--white)',
        border: '1px solid #FFE8A3',
        borderRadius: 'var(--radius-sm)',
        padding: '1rem',
        marginBottom: '1.15rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
            {matchedComplaint.id}
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <PriorityBadge priority={matchedComplaint.priority} />
            <StatusBadge status={matchedComplaint.status} />
          </div>
        </div>
        <h5 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
          {matchedComplaint.title}
        </h5>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {matchedComplaint.description}
        </p>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <ArrowUp size={14} color="var(--primary)" />
          <span>{matchedComplaint.upvotes} Citizens Have Upvoted This Issue</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button variant="accent" icon={ArrowUp} onClick={onUpvoteInstead}>
          Upvote Instead
        </Button>
        <Button variant="outline" onClick={onSubmitAnyway}>
          Submit Anyway
        </Button>
      </div>
    </div>
  );
};
