import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export const FeedbackStatsCard = ({ complaints = [] }) => {
  const reviews = complaints.filter((c) => c.feedback && c.feedback.rating);
  const totalFeedbackCount = reviews.length;

  let satisfactionScore = "5.0";
  let satisfactionPercentage = 100;
  let positiveFeedbackCount = totalFeedbackCount;
  let negativeFeedbackCount = 0;

  if (totalFeedbackCount > 0) {
    const totalRatingSum = reviews.reduce((sum, c) => sum + Number(c.feedback.rating), 0);
    const avg = totalRatingSum / totalFeedbackCount;
    satisfactionScore = avg.toFixed(1);
    satisfactionPercentage = Math.round((avg / 5) * 100);
    positiveFeedbackCount = reviews.filter((c) => Number(c.feedback.rating) >= 4).length;
    negativeFeedbackCount = reviews.filter((c) => Number(c.feedback.rating) <= 2).length;
  }

  return (
    <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
        Citizen Satisfaction & Resolution Quality
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {/* Main Rating Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '2.4rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            color: 'var(--primary)',
            lineHeight: 1
          }}>
            {satisfactionScore}
          </div>
          <div>
            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.2rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} fill="var(--accent)" color="var(--accent)" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {satisfactionPercentage}% Satisfaction Rating
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {totalFeedbackCount > 0 ? `Based on ${totalFeedbackCount} complaint reviews` : 'Based on official resolution feedback'}
            </p>
          </div>
        </div>

        {/* Positive Feedback Count */}
        <div style={{
          backgroundColor: 'var(--bg-page)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: 'var(--neu-shadow-sm)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--white)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ThumbsUp size={18} />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-dark)' }} className="font-number">
              {positiveFeedbackCount}
            </span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Positive Citizen Ratings (4–5 Stars)
            </p>
          </div>
        </div>

        {/* Negative Feedback Flagged Count */}
        <div style={{
          backgroundColor: 'var(--bg-page)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: 'var(--neu-shadow-sm)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            backgroundColor: 'var(--danger)',
            color: 'var(--white)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ThumbsDown size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--danger)' }} className="font-number">
                {negativeFeedbackCount}
              </span>
              {negativeFeedbackCount > 0 && (
                <span className="badge badge-danger" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                  Flagged Review
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Unsatisfactory Reviews (1–2 Stars)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
