import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, isOfficer, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo with Official Balochistan Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-wrap">
            <img src="/balochistan-logo.svg" alt="Balochistan Government Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">Citizen Complaint Portal</span>
            <span className="brand-subtitle">Government of Balochistan • Civic Resolution</span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Publicly accessible) */}
        <nav className="navbar-nav-desktop">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About Us
          </Link>
          <Link to="/complaints" className={`nav-link ${isActive('/complaints') ? 'active' : ''}`}>
            Browse Complaints
          </Link>

          {isAuthenticated && !isOfficer && (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/complaints/mine" className={`nav-link ${isActive('/complaints/mine') ? 'active' : ''}`}>
                My Complaints
              </Link>
            </>
          )}

          {isOfficer && (
            <Link to="/officer/dashboard" className={`nav-link ${isActive('/officer/dashboard') ? 'active' : ''}`}>
              Officer Operations
            </Link>
          )}

          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact Us
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-right-actions">
          {isAuthenticated ? (
            <div className="nav-user-block">
              {!isOfficer && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={PlusCircle}
                  onClick={() => navigate('/complaints/new')}
                >
                  Report Issue
                </Button>
              )}

              <div className="user-profile-menu">
                <div className="avatar-circle">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-info-text">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-role-badge">{user?.role}</span>
                </div>
                <button className="logout-icon-btn" onClick={handleLogout} title="Log out">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-btns-desktop">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav-links">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/complaints" onClick={() => setMobileMenuOpen(false)}>Browse Complaints</Link>

            {isAuthenticated && !isOfficer && (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/complaints/mine" onClick={() => setMobileMenuOpen(false)}>My Complaints</Link>
                <Link to="/complaints/new" onClick={() => setMobileMenuOpen(false)}>Report Complaint</Link>
              </>
            )}

            {isOfficer && (
              <Link to="/officer/dashboard" onClick={() => setMobileMenuOpen(false)}>Officer Dashboard</Link>
            )}

            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>

            {!isAuthenticated && (
              <div className="mobile-auth-btns">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>Sign Up</Button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <Button variant="secondary" fullWidth icon={LogOut} onClick={handleLogout}>
                Logout
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
