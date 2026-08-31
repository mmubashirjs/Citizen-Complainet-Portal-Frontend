import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowUp, MessageSquare, ChevronRight, Car, Trash2, Droplet, Zap, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { formatDate } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';
import { complaintService } from '../../services/complaintService';
import { useToast } from '../../hooks/useToast';
import './ComplaintCard.css';

export const ComplaintCard = ({ complaint, onUpvoteSuccess, isOfficer = false }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const isUpvotedByMe = complaint.upvotedBy?.includes(user?.id);
  const [upvotes, setUpvotes] = useState(complaint.upvotes || 0);
  const [isUpvoted, setIsUpvoted] = useState(isUpvotedByMe);
  const [isUpvoting, setIsUpvoting] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Road': return <Car size={14} />;
      case 'Garbage': return <Trash2 size={14} />;
      case 'Water': return <Droplet size={14} />;
      case 'Electricity': return <Zap size={14} />;
      case 'Other':
      default: return <AlertCircle size={14} />;
    }
  };

  const handleUpvote = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUpvoting) return;
    setIsUpvoting(true);

    try {
      const res = await complaintService.upvoteComplaint(complaint.id, user?.id || 'demo-user');
      setUpvotes(res.upvotes);
      setIsUpvoted(res.isUpvoted);
      showToast(res.isUpvoted ? "Complaint upvoted!" : "Upvote removed", "info");
      if (onUpvoteSuccess) onUpvoteSuccess(complaint.id, res.upvotes);
    } catch (err) {
      showToast("Could not process upvote", "error");
    } finally {
      setIsUpvoting(false);
    }
  };

  const detailPath = isOfficer
    ? `/officer/complaints/${complaint.id}`
    : `/complaints/${complaint.id}`;

  return (
    <div className={`complaint-card card ${complaint.priority === 'Critical' ? 'is-critical' : ''}`}>
      <div className="complaint-card-header">
        <div className="complaint-card-badges">
          <span className="complaint-category-tag">
            {getCategoryIcon(complaint.category)}
            <span>{complaint.category}</span>
          </span>
          <PriorityBadge priority={complaint.priority} />
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="complaint-card-body">
        <Link to={detailPath} className="complaint-card-title-link">
          <h3 className="complaint-card-title">{complaint.title}</h3>
        </Link>

        <p className="complaint-card-desc">
          {complaint.description?.length > 140
            ? `${complaint.description.slice(0, 140)}...`
            : complaint.description}
        </p>

        {complaint.officerRemarks && complaint.officerRemarks.length > 0 && (
          <div className="complaint-card-officer-remark">
            <MessageSquare size={13} className="remark-icon" />
            <span className="remark-text">
              <strong>Latest Update:</strong> "{complaint.officerRemarks[complaint.officerRemarks.length - 1].text}"
            </span>
          </div>
        )}
      </div>

      <div className="complaint-card-footer">
        <div className="complaint-card-meta">
          <span className="meta-item">
            <MapPin size={14} />
            <span>{complaint.area}</span>
          </span>
          <span className="meta-item">
            <Calendar size={14} />
            <span>{formatDate(complaint.createdAt)}</span>
          </span>
        </div>

        <div className="complaint-card-actions">
          <button
            type="button"
            className={`upvote-btn ${isUpvoted ? 'active' : ''}`}
            onClick={handleUpvote}
            disabled={isUpvoting}
            title={isUpvoted ? "Remove upvote" : "Upvote this complaint"}
          >
            <ArrowUp size={15} className={`upvote-arrow ${isUpvoted ? 'upvoted-anim' : ''}`} />
            <span className="upvote-count font-number">{upvotes}</span>
          </button>

          <Link to={detailPath} className="complaint-detail-link">
            <span>View Details</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
