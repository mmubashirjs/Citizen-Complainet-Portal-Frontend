import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-brand-section">
          <div className="footer-brand-header">
            <div className="footer-logo-wrap">
              <img src="/balochistan-logo.svg" alt="Government of Balochistan Logo" className="footer-logo-img" />
            </div>
            <div>
              <span className="footer-brand-title">Citizen Complaint Portal</span>
              <span className="footer-gov-sub">Government of Balochistan</span>
            </div>
          </div>
          <p className="footer-tagline">
            Building a more responsive, accountable, and transparent community across Balochistan through modern civic technology.
          </p>
        </div>

        <div className="footer-links-section">
          <h4 className="footer-links-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/complaints">Browse Complaints</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        <div className="footer-info-section">
          <h4 className="footer-links-title">Civic Accountability</h4>
          <p className="footer-info-text">
            Official public service resolution system. Verified officer actions, transparent municipal workflow, and citizen progress tracking.
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-content">
          <span>&copy; {new Date().getFullYear()} Government of Balochistan — Citizen Complaint Portal. All rights reserved.</span>
          <span>Official Civic Technology Platform</span>
        </div>
      </div>
    </footer>
  );
};
