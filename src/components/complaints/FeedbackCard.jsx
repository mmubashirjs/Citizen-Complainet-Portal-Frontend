import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Textarea } from '../common/Textarea';
import { complaintService } from '../../services/complaintService';
import { useToast } from '../../hooks/useToast';
import './FeedbackCard.css';

export const FeedbackCard = ({ complaint, onFeedbackSubmitted }) => {
  const { showToast } = useToast();
  const existingFeedback = complaint.feedback;

  const [rating, setRating] = useState(existingFeedback?.rating || 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(existingFeedback?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(!!existingFeedback);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await complaintService.submitFeedback(complaint.id, rating, comment);
      setSubmitted(true);
      showToast("Thank you for your feedback!", "success");
      if (onFeedbackSubmitted) onFeedbackSubmitted();
    } catch (err) {
      showToast("Failed to submit feedback", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-card feedback-submitted-state card animate-fade-in">
        <CheckCircle size={36} className="feedback-success-icon" />
        <h4 className="feedback-submitted-title">Thank you for your feedback!</h4>
        <div className="feedback-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={`star-icon ${star <= (existingFeedback?.rating || rating) ? 'star-active' : ''}`}
            />
          ))}
        </div>
        {comment && <p className="feedback-comment-quote">"{comment}"</p>}
      </div>
    );
  }

  return (
    <div className="feedback-card card animate-fade-in">
      <div className="feedback-header">
        <h4 className="feedback-title">Was your issue resolved?</h4>
        <p className="feedback-subtitle">Your feedback helps us improve civic services and officer accountability.</p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-rating-group">
          <label className="form-label">Rate Your Experience</label>
          <div className="stars-picker">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="star-btn"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} star`}
              >
                <Star
                  size={28}
                  className={`star-icon ${star <= (hoverRating || rating) ? 'star-active' : ''}`}
                />
              </button>
            ))}
            <span className="rating-label-text font-number">
              {hoverRating || rating} / 5 Stars
            </span>
          </div>
        </div>

        <Textarea
          label="Tell us about your experience (optional)"
          placeholder="Did the maintenance crew resolve your issue satisfactorily?"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};
