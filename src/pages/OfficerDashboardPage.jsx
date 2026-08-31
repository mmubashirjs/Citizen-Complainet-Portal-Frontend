import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, FileText, Clock, Wrench, CheckCircle2, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { AIBriefingCard } from '../components/officer/AIBriefingCard';
import { FeedbackStatsCard } from '../components/officer/FeedbackStatsCard';
import { PerformanceReportsView } from '../components/officer/PerformanceReportsView';
import { ComplaintFilters } from '../components/complaints/ComplaintFilters';
import { ComplaintTable } from '../components/complaints/ComplaintTable';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { complaintService } from '../services/complaintService';
import { exportComplaintsCSV } from '../utils/csvExporter';
import { useToast } from '../hooks/useToast';
import './OfficerDashboardPage.css';

export const OfficerDashboardPage = () => {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();

  const currentView = searchParams.get('view');
  const currentFilter = searchParams.get('filter');

  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    status: 'All',
    area: 'All',
    priority: 'All',
    sort: 'Highest Priority'
  });

  const [complaints, setComplaints] = useState([]);
  const [allComplaintsData, setAllComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync sidebar navigation query params to filter states
  useEffect(() => {
    if (currentFilter === 'priority') {
      setFilters((prev) => ({
        ...prev,
        status: 'All',
        priority: 'All',
        sort: 'Highest Priority'
      }));
    } else if (currentFilter === 'resolved') {
      setFilters((prev) => ({
        ...prev,
        status: 'Resolved',
        priority: 'All',
        sort: 'Newest'
      }));
    } else if (currentView === 'all') {
      setFilters({
        search: '',
        category: 'All',
        status: 'All',
        area: 'All',
        priority: 'All',
        sort: 'Newest'
      });
    }
  }, [currentView, currentFilter]);

  const fetchOfficerComplaints = async () => {
    setLoading(true);
    try {
      const data = await complaintService.getComplaints(filters);
      setComplaints(data);

      const unfiltered = await complaintService.getComplaints();
      setAllComplaintsData(unfiltered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficerComplaints();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'All',
      status: 'All',
      area: 'All',
      priority: 'All',
      sort: 'Highest Priority'
    });
  };

  const handleCSVExport = () => {
    const success = exportComplaintsCSV(complaints, `officer_complaints_export_${Date.now()}.csv`);
    if (success) {
      showToast(`Exported ${complaints.length} filtered complaints to CSV file.`, "success");
    } else {
      showToast("No complaints to export.", "warning");
    }
  };

  // Dynamically calculate metrics from live backend API dataset
  const totalCount = allComplaintsData.length;
  const criticalCount = allComplaintsData.filter((c) => c.priority === 'Critical').length;
  const pendingCount = allComplaintsData.filter((c) => c.status === 'Pending').length;
  const inProgressCount = allComplaintsData.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = allComplaintsData.filter((c) => c.status === 'Resolved').length;

  return (
    <div className="officer-dashboard-page">
      {/* Header */}
      <div className="officer-header animate-fade-in">
        <div>
          <div className="officer-gov-tag font-number">
            <Shield size={14} /> BALOCHISTAN MUNICIPAL AUTHORITY OPERATIONS
          </div>
          <h1 className="officer-title">
            {currentView === 'reports' ? 'Performance & Analytics Reports' : 'Officer Operations Dashboard'}
          </h1>
          <p className="officer-subtitle">
            {currentView === 'reports'
              ? 'Real-time departmental performance indicators and resolution analytics.'
              : 'Monitor, prioritize, dispatch, and resolve municipal community complaints across Balochistan.'}
          </p>
        </div>

        <div className="officer-header-actions">
          <Button variant="accent" icon={Download} onClick={handleCSVExport}>
            Download CSV
          </Button>
          <Button variant="ghost" icon={RefreshCw} onClick={fetchOfficerComplaints}>
            Refresh Queue
          </Button>
        </div>
      </div>

      {/* Render Dedicated Reports View if ?view=reports */}
      {currentView === 'reports' ? (
        <PerformanceReportsView complaints={allComplaintsData} />
      ) : (
        <>
          {/* AI Daily Briefing Card */}
          <AIBriefingCard complaints={allComplaintsData} />

          {/* Officer Metrics Stats Grid */}
          <div className="officer-stats-grid animate-fade-in">
            <StatCard title="Total Assigned" value={totalCount} icon={FileText} color="primary" />
            <StatCard title="Critical Urgency" value={criticalCount} icon={AlertTriangle} color="danger" />
            <StatCard title="Pending Triage" value={pendingCount} icon={Clock} color="warning" />
            <StatCard title="In Progress" value={inProgressCount} icon={Wrench} color="info" />
            <StatCard title="Resolved Cases" value={resolvedCount} icon={CheckCircle2} color="success" />
          </div>

          {/* Citizen Feedback Analytics Card */}
          <FeedbackStatsCard complaints={allComplaintsData} />

          {/* Filterable Operations Table */}
          <div className="officer-table-section animate-fade-in">
            <div className="table-header-block">
              <h3 className="table-section-title">
                {currentFilter === 'priority' ? 'Priority Complaint Queue' : currentFilter === 'resolved' ? 'Resolved Complaint Archive' : 'Complaint Management Queue'}
              </h3>
              <span className="queue-count-badge font-number">{complaints.length} Queue Items</span>
            </div>

            <ComplaintFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              showCSVExport={true}
              onExportCSV={handleCSVExport}
            />

            {loading ? (
              <LoadingState count={5} type="table" />
            ) : complaints.length === 0 ? (
              <EmptyState
                title="No complaints match filters"
                message="Adjust dropdown filters or search terms to display queue complaints."
                actionText="Reset Filters"
                onAction={handleReset}
              />
            ) : (
              <ComplaintTable complaints={complaints} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
