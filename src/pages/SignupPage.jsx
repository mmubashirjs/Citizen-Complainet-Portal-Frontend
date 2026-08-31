import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, UserCheck, ShieldAlert } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './AuthPages.css';

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [role, setRole] = useState('citizen'); // 'citizen' | 'officer'
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { signup, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) errs.email = 'Enter a valid email address';

    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const res = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: role
      });
      if (res && res.user) {
        showToast(`Account created as ${role === 'officer' ? 'Government Officer' : 'Citizen'}!`, "success");
        if (res.user.role === 'officer') {
          navigate('/officer/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setServerError(err.message || 'Could not create account. Please try again.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card card animate-fade-in">
        <div className="auth-card-header">
          <div className="auth-logo-badge">
            <img src="/balochistan-logo.svg" alt="Government of Balochistan Logo" className="auth-logo-img" />
          </div>
          <h2 className="auth-title">Create Portal Account</h2>
          <p className="auth-subtitle">Select your role and sign up to access civic services or operations.</p>
        </div>

        {serverError && (
          <div className="auth-error-banner" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{serverError}</span>
          </div>
        )}

        {/* Account Role Selector */}
        <div className="role-selector-group">
          <span className="role-selector-label">SELECT ACCOUNT TYPE:</span>
          <div className="role-cards-grid">
            <div
              className={`role-select-card ${role === 'citizen' ? 'active' : ''}`}
              onClick={() => setRole('citizen')}
            >
              <UserCheck size={24} className="role-card-icon" />
              <span className="role-card-title">Citizen Account</span>
              <span className="role-card-desc">Report & track civic issues</span>
            </div>

            <div
              className={`role-select-card ${role === 'officer' ? 'active' : ''}`}
              onClick={() => setRole('officer')}
            >
              <ShieldAlert size={24} className="role-card-icon" />
              <span className="role-card-title">Government Officer</span>
              <span className="role-card-desc">Manage & resolve complaints</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Full Name"
            placeholder={role === 'officer' ? 'e.g. Officer Tariq Mahmood' : 'e.g. Ahmed Hassan'}
            icon={User}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder={role === 'officer' ? 'officer@gov.pk' : 'name@example.com'}
            icon={Mail}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            icon={Lock}
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            icon={Lock}
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={loading}>
            Create {role === 'officer' ? 'Officer' : 'Citizen'} Account
          </Button>
        </form>

        <div className="auth-footer-link">
          Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
        </div>
      </div>
    </div>
  );
};
