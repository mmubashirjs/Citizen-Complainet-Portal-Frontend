import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, AlertTriangle, Send, MapPin, Calendar, User, ArrowUp } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Select } from '../components/common/Select';
import { Textarea } from '../components/common/Textarea';
import { Button } from '../components/common/Button';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { ProgressTimeline } from '../components/complaints/ProgressTimeline';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { complaintService } from '../services/complaintService';
import { formatDate, formatDateTime } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './OfficerComplaintReviewPage.css';

export const OfficerComplaintReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Form states for Officer Action Panel
  const [selectedStatus, setSelectedStatus] = useState('');
  const [remarkText, setRemarkText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmResolve, setShowConfirmResolve] = useState(false);

  const fetchComplaintDetail = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await complaintService.getComplaintById(id);
      if (data) {
        setComplaint(data);
        setSelectedStatus(data.status);
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
    fetchComplaintDetail();
  }, [id]);

  const handleUpdateClick = (e) => {
    e.preventDefault();
    if (selectedStatus === 'Resolved' && complaint?.status !== 'Resolved') {
      setShowConfirmResolve(true);
    } else {
      executeStatusUpdate();
    }
  };

  const executeStatusUpdate = async () => {
    setIsUpdating(true);
    setShowConfirmResolve(false);
    try {
      const updated = await complaintService.updateComplaintStatus(
        complaint.id,
        selectedStatus,
        remarkText,
        user
      );
      setComplaint(updated);
      setRemarkText('');
      showToast(`Complaint ${complaint.id} status updated to ${selectedStatus}!`, "success");
    } catch (err) {
      showToast("Failed to update status", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <LoadingState count={4} />;
  }

  if (error || !complaint) {
    return (
      <ErrorState
        title="Complaint Record Not Found"
        message={`No complaint record found for ID ${id}.`}
        onRetry={() => navigate('/officer/dashboard')}
      />
    );
  }

  return (
    <div className="officer-review-page animate-fade-in">
      <button className="back-link-btn" onClick={() => navigate('/officer/dashboard')}>
        <ArrowLeft size={16} /> Back to Operations Dashboard
      </button>

      {/* Header Banner */}
      <div className="review-header-card card">
        <div className="review-header-left">
          <div className="review-ref-badge font-number">
            <Shield size={14} /> CASE REVIEW: {complaint.id}
          </div>
          <h1 className="review-title">{complaint.title}</h1>
          <div className="review-meta-bar">
            <span><MapPin size={14} /> {complaint.area}</span>
            <span><Calendar size={14} /> Filed: {formatDate(complaint.createdAt)}</span>
            <span><User size={14} /> Citizen: {complaint.citizen?.name} ({complaint.citizen?.email})</span>
            <span><ArrowUp size={14} /> Upvotes: {complaint.upvotes}</span>
          </div>
        </div>

        <div className="review-header-badges">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
        </div>
      </div>

      <div className="review-grid-layout">
        {/* Main Content: Description & Progress Timeline */}
        <div className="review-main-col">
          <div className="card review-details-card">
            <h3 className="review-section-title">Complaint Details & Evidence</h3>
            <p className="review-description">{complaint.description}</p>

            {complaint.photoUrl && (
              <div className="review-photo-section">
                <h4 className="review-sub-title">Photo Attachment</h4>
                <img src={complaint.photoUrl} alt="Complaint Photo" className="review-photo-img" />
              </div>
            )}
          </div>

          <ProgressTimeline currentStatus={complaint.status} history={complaint.history} />

          {/* Past Remarks Log */}
          {complaint.officerRemarks && complaint.officerRemarks.length > 0 && (
            <div className="card review-details-card">
              <h3 className="review-section-title">Officer Logged Remarks</h3>
              <div className="past-remarks-list">
                {complaint.officerRemarks.map((rem) => (
                  <div key={rem.id} className="past-remark-item">
                    <div className="remark-item-header">
                      <span className="font-bold">{rem.officerName} ({rem.department})</span>
                      <span className="text-muted text-xs">{formatDateTime(rem.date)}</span>
                    </div>
                    <p className="remark-text">"{rem.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Officer Action Panel Sidebar */}
        <div className="review-action-col">
          <div className="card action-panel-card">
            <div className="action-panel-header">
              <Shield size={18} className="text-primary" />
              <h3 className="action-panel-title">Officer Action Panel</h3>
            </div>

            <form onSubmit={handleUpdateClick}>
              <Select
                label="Update Complaint Status"
                options={[
                  { value: 'Pending', label: 'Pending Review' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Resolved', label: 'Mark Resolved' }
                ]}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                required
              />

              <Textarea
                label="Officer Remark / Update"
                placeholder="Add an official remark for the citizen (e.g. Maintenance crew dispatched with asphalt repair truck...)"
                rows={4}
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                icon={Send}
                isLoading={isUpdating}
              >
                Update Complaint
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Marking Resolved */}
      <ConfirmModal
        isOpen={showConfirmResolve}
        onClose={() => setShowConfirmResolve(false)}
        onConfirm={executeStatusUpdate}
        title="Confirm Complaint Resolution"
        message="Are you sure you want to mark this complaint as resolved? This will notify the citizen and request their 1–5 star resolution satisfaction feedback."
        confirmText="Mark as Resolved"
        confirmVariant="primary"
        isLoading={isUpdating}
      />
    </div>
  );
};
