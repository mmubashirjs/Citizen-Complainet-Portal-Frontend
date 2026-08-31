import React from 'react';
import { CheckCircle2, Clock, Wrench, CheckCircle, Circle } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import './ProgressTimeline.css';

export const STAGES = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];

export const ProgressTimeline = ({ currentStatus = 'Submitted', history = [] }) => {
  const getStageIndex = (status) => {
    const idx = STAGES.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  const currentIdx = getStageIndex(currentStatus);

  const getStageIcon = (stage, isCompleted, isCurrent) => {
    if (isCompleted || (isCurrent && stage === 'Resolved')) {
      return <CheckCircle2 size={20} className="timeline-stage-icon icon-completed" />;
    }
    if (isCurrent) {
      switch (stage) {
        case 'Submitted': return <Clock size={20} className="timeline-stage-icon icon-current" />;
        case 'Under Review': return <Clock size={20} className="timeline-stage-icon icon-current" />;
        case 'In Progress': return <Wrench size={20} className="timeline-stage-icon icon-current" />;
        default: return <Circle size={20} className="timeline-stage-icon icon-current" />;
      }
    }
    return <Circle size={18} className="timeline-stage-icon icon-upcoming" />;
  };

  const getHistoryItemForStage = (stage) => {
    return history.find((h) => h.status === stage);
  };

  return (
    <div className="timeline-container">
      <h4 className="timeline-header-title">Complaint Resolution Tracker</h4>

      {/* Horizontal Stepper Progress Bar */}
      <div className="stepper-wrapper">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isUpcoming = idx > currentIdx;
          const historyMatch = getHistoryItemForStage(stage);

          return (
            <div
              key={stage}
              className={`stepper-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              <div className="stepper-node">
                {getStageIcon(stage, isCompleted, isCurrent)}
                {idx < STAGES.length - 1 && (
                  <div className={`stepper-line ${idx < currentIdx ? 'line-active' : ''}`} />
                )}
              </div>
              <div className="stepper-content">
                <span className="stepper-label">{stage}</span>
                {historyMatch && (
                  <span className="stepper-date">{formatDateTime(historyMatch.date)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Vertical Event Log */}
      {history && history.length > 0 && (
        <div className="timeline-event-log">
          <h5 className="event-log-title">Audit History & Event Logs</h5>
          <div className="event-log-list">
            {history.map((item, idx) => (
              <div key={idx} className="event-log-item">
                <div className="event-log-bullet" />
                <div className="event-log-details">
                  <div className="event-log-header">
                    <span className="event-log-status">{item.status}</span>
                    <span className="event-log-time">{formatDateTime(item.date)}</span>
                  </div>
                  <p className="event-log-desc">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
