import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, PlusCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { complaintService } from '../services/complaintService';
import { CATEGORIES } from '../data/constants';
import './LandingPage.css';

export const LandingPage = () => {
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await complaintService.getComplaints({ sort: 'Newest' });
        setRecentComplaints(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in">
              <Shield size={16} />
              <span>OFFICIAL BALOCHISTAN CIVIC RESOLUTION PLATFORM</span>
            </div>
            <h1 className="hero-title animate-fade-in">
              Report It. Track It. <span className="text-primary">Resolve It.</span>
            </h1>
            <p className="hero-subtitle animate-fade-in">
              Your voice matters. Report local civic problems, track progress in real-time, and help your community get the issues that matter most resolved by Balochistan municipal authorities.
            </p>
            <div className="hero-actions animate-fade-in">
              <Button
                variant="primary"
                size="lg"
                icon={PlusCircle}
                onClick={() => navigate('/complaints/new')}
              >
                Report a Complaint
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/complaints')}
              >
                Browse Complaints
              </Button>
            </div>
          </div>

          {/* Dynamic Live Feed Card */}
          <div className="hero-visual-wrap animate-fade-in">
            {recentComplaints.length > 0 ? (
              <div style={{ width: '100%' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  color: 'var(--text-muted)'
                }}>
                  <div className="visual-live-dot" />
                  <span className="font-number">LIVE CIVIC REPORT</span>
                </div>
                <ComplaintCard complaint={recentComplaints[0]} />
              </div>
            ) : (
              <div className="civic-visual-card card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div className="visual-header" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                  <div className="visual-live-dot" />
                  <span className="visual-live-title font-number">BALOCHISTAN CIVIC PORTAL ACTIVE</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  No public complaints reported yet. Be the first citizen to log a local civic issue in your district.
                </p>
                <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => navigate('/complaints/new')}>
                  Report First Complaint
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-subtitle">TRANSPARENT PROCESS</span>
            <h2 className="section-title">How The Portal Works</h2>
            <p className="section-desc">Empowering citizens and municipal officers through a transparent four-step workflow.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card card">
              <div className="step-number-circle font-number">1</div>
              <h3 className="step-title">Report an Issue</h3>
              <p className="step-desc">Fill out a simple form with category, locality in Balochistan, description, and photos of the problem.</p>
            </div>
            <div className="step-card card">
              <div className="step-number-circle font-number">2</div>
              <h3 className="step-title">Track Progress</h3>
              <p className="step-desc">Receive a tracking reference ID and follow stage updates from initial triage to repair completion.</p>
            </div>
            <div className="step-card card">
              <div className="step-number-circle font-number">3</div>
              <h3 className="step-title">Officers Take Action</h3>
              <p className="step-desc">Department officers review priority, dispatch crews, and publish official status remarks.</p>
            </div>
            <div className="step-card card">
              <div className="step-number-circle font-number">4</div>
              <h3 className="step-title">See It Resolved</h3>
              <p className="step-desc">Verify resolution completeness and submit 1–5 star feedback to maintain civic accountability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-subtitle">CIVIC SERVICES</span>
            <h2 className="section-title">Browse By Category</h2>
            <p className="section-desc">Select a category to view or report issues in your district.</p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="category-card card"
                onClick={() => navigate(`/complaints?category=${encodeURIComponent(cat)}`)}
              >
                <div className="category-icon-circle">
                  <AlertCircle size={24} />
                </div>
                <h4 className="category-title">{cat}</h4>
                <span className="category-action-link">View Issues &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Public Complaints Section */}
      {recentComplaints.length > 0 && (
        <section className="recent-complaints-section">
          <div className="container">
            <div className="recent-header">
              <div>
                <span className="section-subtitle">COMMUNITY ACTION</span>
                <h2 className="section-title">Recent Public Complaints</h2>
              </div>
              <Link to="/complaints">
                <Button variant="outline" icon={ArrowRight} iconPosition="right">
                  View All Complaints
                </Button>
              </Link>
            </div>

            <div className="recent-complaints-grid">
              {recentComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
