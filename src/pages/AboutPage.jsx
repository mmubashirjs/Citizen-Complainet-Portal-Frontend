import React from 'react';
import { Shield, HeartHandshake, Building2, CheckCircle2, Award, Users, Globe, Target } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page container">
      {/* Hero Header */}
      <div className="about-hero-section animate-fade-in">
        <div className="about-hero-badge">
          <Shield size={18} />
          <span>CIVIC GOVERNANCE & COMMUNITY EMPOWERMENT</span>
        </div>
        <h1 className="about-title">Transforming Civic Resolution in Balochistan</h1>
        <p className="about-subtitle">
          An official digital governance initiative connecting citizens directly with municipal authorities for rapid, transparent, and accountable resolution of public complaints.
        </p>
      </div>

      {/* Key Strategic Partners Section */}
      <div className="about-partners-section animate-fade-in">
        <h2 className="partners-section-title">Strategic Institutional Collaboration</h2>
        <p className="partners-section-desc">
          Powered by the visionary partnership between the Government of Balochistan and Saylani Welfare International Trust.
        </p>

        <div className="partners-grid">
          {/* Balochistan Government Card */}
          <div className="partner-card card partner-balochistan">
            <div className="partner-card-header">
              <div className="partner-logo-wrap">
                <img src="/balochistan-logo.svg" alt="Government of Balochistan Official Seal" className="partner-logo-img" />
              </div>
              <div>
                <h3 className="partner-title">Government of Balochistan</h3>
                <span className="partner-tag">Municipal & Civic Operations Authority</span>
              </div>
            </div>
            <div className="partner-card-body">
              <p className="partner-explanation">
                The <strong>Government of Balochistan</strong> is dedicated to bringing modern digital governance, institutional transparency, and rapid municipal response to every sector and district across the province.
              </p>
              <p className="partner-explanation">
                Through this portal, provincial departments—including Water & Sanitation Authority (WASA), Road Development, Municipal Power, and Sanitation Services—integrate officer workflows, track SLA benchmarks, and publish verifiable resolution logs directly to the public.
              </p>
              <ul className="partner-highlights">
                <li><CheckCircle2 size={16} className="text-primary" /> Direct Officer Triage & On-Site Repair Dispatch</li>
                <li><CheckCircle2 size={16} className="text-primary" /> Real-time SLA Benchmark Tracking across Districts</li>
                <li><CheckCircle2 size={16} className="text-primary" /> Verifiable Public Resolution Logs & Progress History</li>
              </ul>
            </div>
          </div>

          {/* Saylani Welfare International Trust Card */}
          <div className="partner-card card partner-saylani">
            <div className="partner-card-header">
              <div className="partner-logo-wrap saylani-logo-bg">
                <HeartHandshake size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="partner-title">Saylani Welfare International Trust</h3>
                <span className="partner-tag">Civic Tech & Empowerment Partner</span>
              </div>
            </div>
            <div className="partner-card-body">
              <p className="partner-explanation">
                <strong>Saylani Welfare International Trust</strong> is one of the world's largest humanitarian organizations, serving millions through food, healthcare, disaster relief, and transformative technology education (SMIT).
              </p>
              <p className="partner-explanation">
                In alignment with its mission to leverage technology for social good, Saylani spearheaded the technical architecture, user experience design, and digital engineering of the Balochistan Citizen Portal, ensuring accessibility, reliability, and high performance for all citizens.
              </p>
              <ul className="partner-highlights">
                <li><CheckCircle2 size={16} className="text-primary" /> Open Civic Tech Innovation & UX Accessibility</li>
                <li><CheckCircle2 size={16} className="text-primary" /> Saylani Mass IT Training (SMIT) Developer Leadership</li>
                <li><CheckCircle2 size={16} className="text-primary" /> 24/7 High-Reliability Infrastructure Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Objectives Grid */}
      <div className="about-objectives-section animate-fade-in">
        <div className="section-header-center">
          <span className="section-subtitle">OUR MISSION & GOALS</span>
          <h2 className="section-title">Core Principles Driving Impact</h2>
        </div>

        <div className="objectives-grid">
          <div className="objective-card card">
            <div className="objective-icon-wrap">
              <Globe size={24} className="text-primary" />
            </div>
            <h4 className="objective-title">Universal Access</h4>
            <p className="objective-desc">
              Every citizen across Quetta, Gwadar, Khuzdar, Turbat, Hub, and all Balochistan districts can report issues anytime from any device.
            </p>
          </div>

          <div className="objective-card card">
            <div className="objective-icon-wrap">
              <Target size={24} className="text-primary" />
            </div>
            <h4 className="objective-title">Rapid Triage & SLA</h4>
            <p className="objective-desc">
              Officer dashboard algorithms prioritize critical municipal emergencies like main water leaks and road hazards for fast crew dispatch.
            </p>
          </div>

          <div className="objective-card card">
            <div className="objective-icon-wrap">
              <Award size={24} className="text-primary" />
            </div>
            <h4 className="objective-title">Verified Accountability</h4>
            <p className="objective-desc">
              Citizens submit 1–5 star ratings and satisfaction reviews upon completion to maintain top service standards.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="about-cta-card card animate-fade-in">
        <div>
          <h3 className="cta-title">Ready to Make Your Neighborhood Better?</h3>
          <p className="cta-subtitle">Report a pothole, water leak, or street light issue today and track its resolution live.</p>
        </div>
        <div className="cta-actions">
          <Button variant="primary" size="lg" onClick={() => navigate('/complaints/new')}>
            Report a Complaint
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
