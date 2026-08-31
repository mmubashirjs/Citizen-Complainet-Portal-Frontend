import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, TrendingUp } from 'lucide-react';
import { aiService } from '../../services/aiService';
import './AIBriefingCard.css';

export const AIBriefingCard = ({ complaints = [] }) => {
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBriefing = async () => {
    setLoading(true);
    try {
      const data = await aiService.getOfficerSummary();
      setBriefing(data);
    } catch (e) {
      console.error("AI briefing fetch error", e);
      // Generate dynamic intelligence summary based on live complaints
      const criticalCount = complaints.filter((c) => c.priority === 'Critical').length;
      const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
      setBriefing({
        summary: `Balochistan Municipal Operations Queue currently has ${complaints.length} active complaints. ${criticalCount} critical issue(s) require immediate dispatch.`,
        lastUpdated: "Just now",
        insights: [
          { title: "Priority Focus", text: `${criticalCount} critical case(s) flagged for rapid dispatch.` },
          { title: "Triage Status", text: `${pendingCount} pending complaint(s) awaiting officer assignment.` }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefing();
  }, [complaints.length]);

  return (
    <div className="ai-briefing-card animate-fade-in">
      <div className="ai-briefing-header">
        <div className="ai-briefing-tag">
          <Sparkles size={16} className="sparkles-icon" />
          <span>AI DAILY BRIEFING</span>
        </div>
        <div className="ai-briefing-meta">
          <span className="updated-text">Updated {briefing?.lastUpdated || 'just now'}</span>
          <button className="refresh-briefing-btn" onClick={fetchBriefing} disabled={loading} title="Refresh AI Briefing">
            <RefreshCw size={14} className={loading ? 'spinning' : ''} />
          </button>
        </div>
      </div>

      <div className="ai-briefing-content">
        <p className="ai-briefing-summary">
          {loading ? "Generating operational intelligence summary..." : briefing?.summary}
        </p>

        {briefing?.insights && briefing.insights.length > 0 && (
          <div className="ai-insights-grid">
            {briefing.insights.map((insight, idx) => (
              <div key={idx} className="ai-insight-pill">
                <TrendingUp size={14} className="insight-icon" />
                <div>
                  <strong className="insight-title">{insight.title}: </strong>
                  <span className="insight-text">{insight.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
