import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { FeedbackCard } from '../components/complaints/FeedbackCard';
import { complaintService } from '../services/complaintService';
import { useAuth } from '../hooks/useAuth';
import './CitizenDashboard.css';

export const MyComplaintsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchMine = async () => {
    setLoading(true);
    try {
      const userComplaints = await complaintService.getMyComplaints();
      setComplaints(userComplaints);
    } catch (e) {
      console.error("Error fetching my complaints", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMine();
  }, [user]);

  const filtered = complaints.filter((c) => {
    if (activeTab === 'All') return true;
    return c.status === activeTab;
  });

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      <div className="dashboard-header animate-fade-in">
        <div>
          <h1 className="dashboard-title">My Filed Complaints</h1>
          <p className="dashboard-subtitle">Track status changes, official officer updates, and submit resolution feedback for your issues.</p>
        </div>
        <Button variant="primary" icon={PlusCircle} onClick={() => navigate('/complaints/new')}>
          Report Issue
        </Button>
      </div>

      {/* Top Stats */}
      <div className="dashboard-stats-grid animate-fade-in">
        <StatCard title="Total Filed" value={totalCount} icon={FileText} color="primary" />
        <StatCard title="Pending" value={pendingCount} icon={Clock} color="warning" />
        <StatCard title="In Progress" value={inProgressCount} icon={AlertCircle} color="info" />
        <StatCard title="Resolved" value={resolvedCount} icon={CheckCircle2} color="success" />
      </div>

      {/* Status Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.75rem',
        overflowX: 'auto'
      }}>
        {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', fontSize: '0.88rem' }}
            onClick={() => setActiveTab(tab)}
          >
            {tab} {tab === 'All' ? `(${totalCount})` : tab === 'Pending' ? `(${pendingCount})` : tab === 'In Progress' ? `(${inProgressCount})` : `(${resolvedCount})`}
          </button>
        ))}
      </div>

      {/* List / Cards */}
      {loading ? (
        <LoadingState count={3} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No complaints found"
          message="You don't have any complaints matching this status filter."
          actionText="Report a New Issue"
          onAction={() => navigate('/complaints/new')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filtered.map((item) => (
            <div key={item.id}>
              <ComplaintCard complaint={item} />
              {/* Show feedback prompt if complaint is resolved */}
              {item.status === 'Resolved' && (
                <FeedbackCard complaint={item} onFeedbackSubmitted={fetchMine} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
