// Production Clean Data Exports
import { CATEGORIES as CONST_CATEGORIES, LOCALITIES as CONST_LOCALITIES } from './constants';

export const MOCK_COMPLAINTS = [];
export const MOCK_AI_BRIEFING = null;
export const MOCK_OFFICER_STATS = {
  totalComplaints: 0,
  newToday: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  criticalCount: 0,
  satisfactionScore: 5.0,
  satisfactionPercentage: 100,
  totalFeedbackCount: 0,
  positiveFeedbackCount: 0,
  negativeFeedbackCount: 0
};

export const CATEGORIES = CONST_CATEGORIES;
export const LOCALITIES = CONST_LOCALITIES;
