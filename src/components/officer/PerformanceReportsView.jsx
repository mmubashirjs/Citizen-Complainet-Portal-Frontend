import React from 'react';
import { BarChart2, TrendingUp, Clock, CheckCircle2, Award, Download, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';
import { exportComplaintsCSV } from '../../utils/csvExporter';
import { useToast } from '../../hooks/useToast';

export const PerformanceReportsView = ({ complaints = [] }) => {
  const { showToast } = useToast();

  const handleExport = () => {
    const success = exportComplaintsCSV(complaints, `performance_report_${Date.now()}.csv`);
    if (success) {
      showToast("Performance report exported as CSV!", "success");
    }
  };

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  const categoriesCount = {
    Road: complaints.filter((c) => c.category === 'Road').length,
    Garbage: complaints.filter((c) => c.category === 'Garbage').length,
    Water: complaints.filter((c) => c.category === 'Water').length,
    Electricity: complaints.filter((c) => c.category === 'Electricity').length,
    Other: complaints.filter((c) => c.category === 'Other').length
  };

  return (
    <div className="performance-reports-view animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Report Header */}
      <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
              EXECUTIVE ANALYTICS REPORT
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Municipal Service Resolution & Performance
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Quarterly performance breakdown across departments, resolution velocity, and citizen satisfaction ratings.
            </p>
          </div>
          <Button variant="accent" icon={Download} onClick={handleExport}>
            Export Report CSV
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resolution Rate</span>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-dark)' }} className="font-number">
            {resolutionRate}%
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{resolved} out of {total} cases resolved</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Resolution Time</span>
            <Clock size={18} className="text-info" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }} className="font-number">
            2.4 Days
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>&darr; 1.2 days faster than last month</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Satisfaction Score</span>
            <Award size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }} className="font-number">
            4.6 / 5.0
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>94% positive citizen feedback</span>
        </div>
      </div>

      {/* Category Breakdown Charts */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          Category Distribution & Demand Breakdown
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {Object.entries(categoriesCount).map(([cat, count]) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <span>{cat} Issues</span>
                  <span className="font-number">{count} complaints ({pct}%)</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: cat === 'Road' ? '#009846' : cat === 'Water' ? '#1778D0' : cat === 'Garbage' ? '#D99A00' : cat === 'Electricity' ? '#E67E22' : '#8E44AD',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Efficiency Matrix */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Departmental SLA Compliance & Efficiency Matrix
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Department</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Active Queue</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Resolved (30d)</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>SLA Compliance</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Capital Road Development</td>
                <td style={{ padding: '0.85rem 1rem' }}>42 cases</td>
                <td style={{ padding: '0.85rem 1rem' }}>318 cases</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--primary)', fontWeight: 700 }}>96.4%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Water & Sanitation Authority (WASA)</td>
                <td style={{ padding: '0.85rem 1rem' }}>28 cases</td>
                <td style={{ padding: '0.85rem 1rem' }}>245 cases</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--primary)', fontWeight: 700 }}>93.8%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Municipal Power & Lighting</td>
                <td style={{ padding: '0.85rem 1rem' }}>19 cases</td>
                <td style={{ padding: '0.85rem 1rem' }}>189 cases</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--primary)', fontWeight: 700 }}>98.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
