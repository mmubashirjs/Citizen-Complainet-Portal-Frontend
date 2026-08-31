import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ArrowUp, User, Shield, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Button } from '../components/common/Button';
import { ProgressTimeline } from '../components/complaints/ProgressTimeline';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { complaintService } from '../services/complaintService';
import { formatDate, formatDateTime } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './ComplaintDetailPage.css';

export const ComplaintDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await complaintService.getComplaintById(id);
      if (data) {
        setComplaint(data);
        setUpvotes(data.upvotes || 0);
        setIsUpvoted(data.upvotedBy?.includes(user?.id));
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id, user]);

  const handleUpvote = async () => {
    try {
      const res = await complaintService.upvoteComplaint(complaint.id, user?.id || 'demo-user');
      setUpvotes(res.upvotes);
      setIsUpvoted(res.isUpvoted);
      showToast(res.isUpvoted ? "Complaint upvoted!" : "Upvote removed", "info");
    } catch (err) {
      showToast("Could not process upvote", "error");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <LoadingState count={3} />
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <ErrorState
          title="Complaint Not Found"
          message={`We couldn't find a record for tracking reference ${id}.`}
          onRetry={() => navigate('/complaints')}
        />
      </div>
    );
  }

  return (
    <div className="complaint-detail-page container">
      {/* Top Nav Back */}
      <div className="detail-top-nav animate-fade-in">
        <button className="back-link-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Complaints
        </button>
        <div className="detail-breadcrumbs">
          <Link to="/">Home</Link> &rsaquo; <Link to="/complaints">Complaints</Link> &rsaquo; <span>{complaint.id}</span>
        </div>
      </div>

      <div className="detail-layout-grid animate-fade-in">
        {/* Main Content Area */}
        <div className="detail-main-col">
          {/* Header Card */}
          <div className="detail-card card">
            <div className="detail-title-header">
              <span className="detail-category-badge">{complaint.category}</span>
              <h1 className="detail-title">{complaint.title}</h1>
              <div className="detail-meta-row">
                <span className="meta-item"><MapPin size={15} /> {complaint.area}</span>
                <span className="meta-item"><Calendar size={15} /> Filed on {formatDate(complaint.createdAt)}</span>
                <span className="meta-item"><User size={15} /> Reported by {complaint.citizen?.name || 'Citizen'}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4 className="detail-section-label">Issue Description</h4>
              <p className="detail-description-text">{complaint.description}</p>
            </div>

            {/* Attached Photo Preview */}
            {complaint.photoUrl && (
              <div className="detail-section">
                <h4 className="detail-section-label">Attached Photo Evidence</h4>
                <div className="detail-photo-frame">
                  <img src={complaint.photoUrl} alt="Complaint Evidence" className="detail-photo-img" />
                </div>
              </div>
            )}
          </div>

          {/* Resolution Timeline Progress */}
          <ProgressTimeline currentStatus={complaint.status} history={complaint.history} />

          {/* Official Officer Remarks */}
          <div className="detail-card card">
            <h4 className="detail-section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageSquare size={18} className="text-primary" />
              Official Officer Updates & Remarks
            </h4>

            {complaint.officerRemarks && complaint.officerRemarks.length > 0 ? (
              <div className="officer-remarks-list">
                {complaint.officerRemarks.map((remark) => (
                  <div key={remark.id} className="officer-remark-box">
                    <div className="remark-header">
                      <div className="officer-badge-info">
                        <Shield size={14} className="text-primary" />
                        <span className="officer-name">{remark.officerName}</span>
                        <span className="officer-dept">• {remark.department}</span>
                      </div>
                      <span className="remark-time">{formatDateTime(remark.date)}</span>
                    </div>
                    <p className="remark-body">"{remark.text}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No officer remarks have been published for this case yet.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Case Information */}
        <div className="detail-sidebar-col">
          <div className="case-info-card card">
            <div className="case-card-header">
              <span className="case-ref-label font-number">CASE REFERENCE</span>
              <h3 className="case-ref-id font-number">{complaint.id}</h3>
            </div>

            <div className="case-badges-block">
              <div className="case-badge-row">
                <span className="case-label font-bold">Status:</span>
                <StatusBadge status={complaint.status} />
              </div>
              <div className="case-badge-row">
                <span className="case-label font-bold">Priority:</span>
                <PriorityBadge priority={complaint.priority} />
              </div>
            </div>

            {/* Upvote Button Container */}
            <div className="case-upvote-box">
              <div className="upvote-stat-text">
                <span className="upvote-num font-number">{upvotes}</span>
                <span className="upvote-lbl">Citizens Support This Issue</span>
              </div>

              <Button
                variant={isUpvoted ? "primary" : "outline"}
                fullWidth
                icon={ArrowUp}
                onClick={handleUpvote}
              >
                {isUpvoted ? "Upvoted" : "Upvote Complaint"}
              </Button>
            </div>

            <div className="case-footer-meta">
              <span>Last updated: {formatDateTime(complaint.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
