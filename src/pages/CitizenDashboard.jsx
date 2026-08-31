import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, ListFilter, Users, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { complaintService } from '../services/complaintService';
import { useAuth } from '../hooks/useAuth';
import './CitizenDashboard.css';

export const CitizenDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      setLoading(true);
      try {
        const data = await complaintService.getMyComplaints();
        setComplaints(data);
      } catch (e) {
        console.error("Error fetching my complaints for dashboard", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUserComplaints();
  }, [user]);

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <div className="citizen-dashboard container">
      {/* Header */}
      <div className="dashboard-header animate-fade-in">
        <div>
          <h1 className="dashboard-title">Good morning, {user?.name || 'Citizen'} 👋</h1>
          <p className="dashboard-subtitle">Here is what is happening with your filed civic complaints.</p>
        </div>
        <Button variant="primary" icon={PlusCircle} onClick={() => navigate('/complaints/new')}>
          Report a Complaint
        </Button>
      </div>

      {/* Top Stats Cards */}
      <div className="dashboard-stats-grid animate-fade-in">
        <StatCard
          title="My Filed Complaints"
          value={totalCount}
          subtitle="Submitted under your account"
          icon={FileText}
          color="primary"
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          subtitle="Awaiting officer triage"
          icon={Clock}
          color="warning"
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          subtitle="Maintenance team on site"
          icon={AlertCircle}
          color="info"
        />
        <StatCard
          title="Issues Resolved"
          value={resolvedCount}
          subtitle="Completed municipal repairs"
          icon={CheckCircle2}
          color="success"
        />
      </div>

      {/* Quick Action Banners */}
      <div className="quick-actions-grid animate-fade-in">
        <div className="quick-action-card card action-report">
          <div className="action-card-body">
            <div className="action-icon-circle bg-primary-light text-primary">
              <PlusCircle size={24} />
            </div>
            <div>
              <h3 className="action-card-title">Report a Complaint</h3>
              <p className="action-card-desc">Spotted a pothole, garbage spill, or streetlight issue in your sector?</p>
            </div>
          </div>
          <Button variant="primary" onClick={() => navigate('/complaints/new')}>
            Report Now
          </Button>
        </div>

        <div className="quick-action-card card action-mine">
          <div className="action-card-body">
            <div className="action-icon-circle bg-info-light text-info">
              <ListFilter size={24} />
            </div>
            <div>
              <h3 className="action-card-title">My Complaints</h3>
              <p className="action-card-desc">Track status updates, officer remarks, and resolution progress.</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => navigate('/complaints/mine')}>
            View My Complaints
          </Button>
        </div>

        <div className="quick-action-card card action-browse">
          <div className="action-card-body">
            <div className="action-icon-circle bg-accent-light text-accent">
              <Users size={24} />
            </div>
            <div>
              <h3 className="action-card-title">Browse Community Issues</h3>
              <p className="action-card-desc">See what neighbors are reporting in Sector G-9 and upvote urgent matters.</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate('/complaints')}>
            Browse Community
          </Button>
        </div>
      </div>

      {/* Recent Complaints Section */}
      <div className="dashboard-recent-section animate-fade-in">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">My Recent Filed Complaints</h2>
          <Link to="/complaints/mine" className="text-primary font-bold text-sm">
            View All My Complaints &rarr;
          </Link>
        </div>

        {loading ? (
          <LoadingState count={2} />
        ) : complaints.length === 0 ? (
          <EmptyState
            title="You haven't filed any complaints yet"
            message="Report a civic problem in your area to track its resolution status here."
            actionText="Report a Complaint"
            onAction={() => navigate('/complaints/new')}
          />
        ) : (
          <div className="recent-complaints-grid">
            {complaints.slice(0, 3).map((item) => (
              <ComplaintCard key={item.id} complaint={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
