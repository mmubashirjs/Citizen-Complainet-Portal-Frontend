import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import './AuthPages.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both email address and password.');
      return;
    }
    setError('');

    try {
      const res = await login(email.trim(), password);
      if (res && res.user) {
        showToast(`Welcome back, ${res.user.name}!`, "success");
        if (res.user.role === 'officer') {
          navigate('/officer/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card card animate-fade-in">
        <div className="auth-card-header">
          <div className="auth-logo-badge">
            <img src="/balochistan-logo.svg" alt="Government of Balochistan Logo" className="auth-logo-img" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Log in to track your complaints or manage municipal operations.</p>
        </div>

        {error && (
          <div className="auth-error-banner" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            required
          />

          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={loading}>
            Login to Portal
          </Button>
        </form>

        <div className="auth-footer-link">
          Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
