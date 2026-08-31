import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ScrollToTop } from './components/common/ScrollToTop';

/* Layouts */
import { PublicLayout } from './layouts/PublicLayout';
import { CitizenLayout } from './layouts/CitizenLayout';
import { OfficerLayout } from './layouts/OfficerLayout';

/* Pages */
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { ReportComplaintPage } from './pages/ReportComplaintPage';
import { MyComplaintsPage } from './pages/MyComplaintsPage';
import { PublicComplaintsPage } from './pages/PublicComplaintsPage';
import { ComplaintDetailPage } from './pages/ComplaintDetailPage';
import { OfficerDashboardPage } from './pages/OfficerDashboardPage';
import { OfficerComplaintReviewPage } from './pages/OfficerComplaintReviewPage';

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/complaints" element={<PublicComplaintsPage />} />
              <Route path="/complaints/:id" element={<ComplaintDetailPage />} />
            </Route>

            {/* Citizen Protected Routes */}
            <Route element={<CitizenLayout />}>
              <Route path="/dashboard" element={<CitizenDashboard />} />
              <Route path="/complaints/new" element={<ReportComplaintPage />} />
              <Route path="/complaints/mine" element={<MyComplaintsPage />} />
            </Route>

            {/* Officer Protected Routes */}
            <Route element={<OfficerLayout />}>
              <Route path="/officer/dashboard" element={<OfficerDashboardPage />} />
              <Route path="/officer/complaints/:id" element={<OfficerComplaintReviewPage />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
