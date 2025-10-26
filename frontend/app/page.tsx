"use client";

import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Dashboard from "./components/Dashboard";
import Training from "./components/Training";
import Tracking from "./components/Tracking";
import Champions from "./components/Champions"; // New Import
import Marketplace from "./components/Marketplace"; // New Import
import Chatbot from "./components/Chatbot"; // New Import
import Profile from "./components/Profile"; // New Import
import { AuthProvider, useAuth, LoginModal, SignupModal } from "./components/Auth";

// --- MODAL COMPONENTS (Kept local for simplicity) ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportIssueModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      {" "}
      <div className="modal-content">
        {" "}
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {" "}
        <h2 className="modal-title">Report New Civic Issue</h2>
        {" "}
        <form onSubmit={(e) => {
          e.preventDefault();
          alert('Issue reporting will be implemented with Supabase integration');
          onClose();
        }}>
          {" "}
          <div className="form-group">
            {" "}
            <label htmlFor="incidentType">Issue Type</label>
            {" "}
            <select id="incidentType" className="form-control">
              <option>Pothole</option>
              <option>Garbage</option>
              <option>Streetlight</option>
              <option>Other</option>
              {" "}
            </select>
            {" "}
          </div>
          {" "}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            {" "}
            <input
              type="text"
              id="location"
              className="form-control"
              placeholder="e.g., Sector 15, Gurgaon or use GPS coordinates"
              required
            />
            {" "}
          </div>
          {" "}
          <div className="form-group">
            {" "}
            <label htmlFor="photo">Photo (Optional)</label>
            {" "}
            <input
              type="file"
              id="photo"
              className="form-control"
              accept="image/*"
            />
            {" "}
          </div>
          {" "}
          <div className="form-group">
            {" "}
            <label htmlFor="description">Description (Optional)</label>
            {" "}
            <textarea
              id="description"
              className="form-control"
              rows={3}
            ></textarea>
            {" "}
          </div>
          {" "}
          <div className="form-actions">
            {" "}
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            {" "}
            <button type="submit" className="btn btn--primary">
              Submit Report
            </button>
            {" "}
          </div>
          {" "}
        </form>
        {" "}
      </div>
      {" "}
      {" "}
    </div>
  );
};

// Main App Component (inside AuthProvider)
const AppContent: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activePage, setActivePage] = useState<string>("dashboard");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  // Show loading spinner while auth is initializing
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  const handleNavClick = (pageId: string) => {
    // Require authentication for profile page
    if (pageId === 'profile' && !isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setActivePage(pageId);
    setIsModalOpen(false);
  };

  const openReportModal = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const closeReportModal = () => setIsModalOpen(false);

  // Function to render the correct component
  const renderPage = () => {
    switch (activePage) {
      case "training":
        return <Training />;
      case "tracking":
        return <Tracking />;
      case "champions":
        return <Champions />;
      case "marketplace":
        return <Marketplace />;
      case "profile":
        return <Profile />;
      case "dashboard":
      default:
        return <Dashboard userRole={user?.role || 'citizen'} />;
    }
  };

  return (
    <>
      <Header
        activePage={activePage}
        onNavClick={handleNavClick}
        userRole={user?.role || 'citizen'}
        onRoleChange={() => {}} // Role changes now handled through login
        onReportClick={openReportModal}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
      />
      <main className="main">{renderPage()}</main>
      <BottomNav activePage={activePage} onNavClick={handleNavClick} />
      {/* Report Issue Modal */}
      <ReportIssueModal isOpen={isModalOpen} onClose={closeReportModal} />
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user: { id: string; email: string; name: string; role: string }) => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSignupSuccess={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      {/* Chatbot */}
      <Chatbot />
    </>
  );
};

export default function HomePage() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
