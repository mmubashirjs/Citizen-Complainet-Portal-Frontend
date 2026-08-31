import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

export const OfficerLayout = () => {
  const { isAuthenticated, isOfficer } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, backgroundColor: 'var(--bg-page)', padding: '1.75rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
