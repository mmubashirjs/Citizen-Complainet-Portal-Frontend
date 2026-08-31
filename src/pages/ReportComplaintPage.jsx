import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldAlert, ArrowLeft, Send } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Textarea } from '../components/common/Textarea';
import { FileUpload } from '../components/common/FileUpload';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { DuplicateWarning } from '../components/complaints/DuplicateWarning';
import { complaintService } from '../services/complaintService';
import { CATEGORIES, LOCALITIES } from '../data/constants';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './ReportComplaintPage.css';

export const ReportComplaintPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    area: '',
    description: '',
    photoUrl: null
  });

  const [errors, setErrors] = useState({});
  const [duplicateMatch, setDuplicateMatch] = useState(null);
  const [ignoreDuplicate, setIgnoreDuplicate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Trigger duplicate check when category + area selected
  useEffect(() => {
    const checkDupes = async () => {
      if (formData.category && formData.area && !ignoreDuplicate) {
        const matched = await complaintService.checkDuplicates(formData.category, formData.area);
        setDuplicateMatch(matched);
      } else {
        setDuplicateMatch(null);
      }
    };
    checkDupes();
  }, [formData.category, formData.area, ignoreDuplicate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Complaint title is required';
    if (!formData.category) errs.category = 'Select a civic category';
    if (!formData.area) errs.area = 'Select or enter locality area';
    if (!formData.description.trim()) errs.description = 'Please describe the issue in detail';
    else if (formData.description.length < 15) errs.description = 'Description should be at least 15 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const res = await complaintService.createComplaint(formData, user);
      setCreatedComplaint(res);
      setShowSuccessModal(true);
      showToast("Complaint registered successfully!", "success");
    } catch (err) {
      showToast("Failed to submit complaint. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvoteDuplicate = async () => {
    if (duplicateMatch) {
      await complaintService.upvoteComplaint(duplicateMatch.id);
      showToast(`Upvoted existing complaint #${duplicateMatch.id}!`, "success");
      navigate(`/complaints/${duplicateMatch.id}`);
    }
  };

  return (
    <div className="report-page container">
      <div className="report-page-header animate-fade-in">
        <button className="back-link-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="report-title">Report a Civic Issue</h1>
        <p className="report-subtitle">Tell us what's wrong and we'll help get it to the right municipal department in Balochistan.</p>
      </div>

      <div className="report-content-grid">
        {/* Main Complaint Form */}
        <div className="report-form-card card animate-fade-in">
          {duplicateMatch && !ignoreDuplicate && (
            <DuplicateWarning
              matchedComplaint={duplicateMatch}
              onUpvoteInstead={handleUpvoteDuplicate}
              onSubmitAnyway={() => setIgnoreDuplicate(true)}
            />
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Complaint Title"
              placeholder="e.g. Water pipeline leak near City Square"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
              required
            />

            <div className="form-row-2">
              <Select
                label="Category"
                options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                placeholder="Select category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                error={errors.category}
                required
              />

              <Select
                label="Area / Locality District"
                options={LOCALITIES.map((loc) => ({ value: loc, label: loc }))}
                placeholder="Select sector or district"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                error={errors.area}
                required
              />
            </div>

            <Textarea
              label="Description"
              placeholder="Describe the issue, its precise location, and how it is affecting the community..."
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={errors.description}
              required
            />

            <FileUpload
              label="Optional Photo"
              value={formData.photoUrl}
              onFileSelect={(fileData) => handleChange('photoUrl', fileData)}
            />

            <div className="form-submit-row">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Send}
                isLoading={submitting}
              >
                Submit Complaint
              </Button>
            </div>
          </form>
        </div>

        {/* Helpful Tips Sidebar */}
        <div className="report-tips-card card animate-fade-in">
          <h4 className="tips-title">
            <ShieldAlert size={18} className="text-primary" />
            Tips for Faster Resolution
          </h4>
          <ul className="tips-list">
            <li><strong>Be Specific:</strong> Mention landmarks, street numbers, or block identifiers in Balochistan.</li>
            <li><strong>Add Photos:</strong> Clear photos help maintenance crews bring the right equipment.</li>
            <li><strong>Check Duplicates:</strong> If neighbors already reported the issue, upvoting increases priority.</li>
            <li><strong>Track Reference:</strong> Save your reference ID to monitor official officer updates.</li>
          </ul>
        </div>
      </div>

      {/* Complaint Submission Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => navigate('/complaints/mine')}
        title="Complaint Submitted Successfully"
      >
        <div className="success-modal-body">
          <div className="success-icon-circle">
            <CheckCircle2 size={38} />
          </div>
          <p className="success-msg-text">
            Your complaint has been recorded and assigned an official tracking reference.
          </p>

          <div className="success-ref-card">
            <span className="ref-label">TRACKING REFERENCE ID</span>
            <span className="ref-number font-number">{createdComplaint?.id || 'CC-10288'}</span>
            <div className="ref-meta font-bold">
              Status: <span className="text-warning">● Pending Review</span>
            </div>
          </div>

          <div className="success-modal-actions">
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/complaints/mine')}
            >
              View My Complaints
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setShowSuccessModal(false);
                setFormData({ title: '', category: '', area: '', description: '', photoUrl: null });
                setIgnoreDuplicate(false);
              }}
            >
              Report Another Issue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
