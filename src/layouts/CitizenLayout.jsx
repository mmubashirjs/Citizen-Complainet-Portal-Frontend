import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export const CitizenLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, backgroundColor: 'var(--bg-page)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
