import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, AlertTriangle, CheckCircle2, BarChart2 } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentView = searchParams.get('view');
  const currentFilter = searchParams.get('filter');

  const isDashboardOverview = location.pathname === '/officer/dashboard' && !currentView && !currentFilter;
  const isAllComplaints = currentView === 'all';
  const isPriorityIssues = currentFilter === 'priority';
  const isResolvedCases = currentFilter === 'resolved';
  const isReportsView = currentView === 'reports';

  return (
    <aside className="officer-sidebar">
      <div className="sidebar-brand-block">
        <div className="sidebar-logo-wrap">
          <img src="/balochistan-logo.svg" alt="Balochistan Government Logo" className="sidebar-logo-img" />
        </div>
        <div className="sidebar-brand-info">
          <span className="sidebar-portal-name">Government Portal</span>
          <span className="sidebar-dept-name">Govt. of Balochistan</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">OPERATIONS MENU</span>

        <Link
          to="/officer/dashboard"
          className={`sidebar-link ${isDashboardOverview ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard Overview</span>
        </Link>

        <Link
          to="/officer/dashboard?view=all"
          className={`sidebar-link ${isAllComplaints ? 'active' : ''}`}
        >
          <FileText size={18} />
          <span>All Complaints</span>
        </Link>

        <Link
          to="/officer/dashboard?filter=priority"
          className={`sidebar-link ${isPriorityIssues ? 'active' : ''}`}
        >
          <AlertTriangle size={18} />
          <span>Priority Issues</span>
        </Link>

        <Link
          to="/officer/dashboard?filter=resolved"
          className={`sidebar-link ${isResolvedCases ? 'active' : ''}`}
        >
          <CheckCircle2 size={18} />
          <span>Resolved Cases</span>
        </Link>

        <span className="sidebar-section-label" style={{ marginTop: '1.5rem' }}>ANALYTICS & REPORTS</span>

        <Link
          to="/officer/dashboard?view=reports"
          className={`sidebar-link ${isReportsView ? 'active' : ''}`}
        >
          <BarChart2 size={18} />
          <span>Performance Reports</span>
        </Link>
      </nav>
    </aside>
  );
};
