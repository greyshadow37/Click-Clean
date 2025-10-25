"use client";

import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Dashboard from "./components/Dashboard";
import Training from "./components/Training";
import Tracking from "./components/Tracking";
import Champions from "./components/Champions"; // New Import
import Marketplace from "./components/Marketplace"; // New Import

import { initialUserState, UserState, UserRole } from "../lib/data";

// --- MODAL COMPONENTS (Kept local for simplicity) ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportWasteModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
        <h2 className="modal-title">Report New Waste Incident</h2>
        {" "}
        <form>
          {" "}
          <div className="form-group">
            {" "}
            <label htmlFor="incidentType">Incident Type</label>
            {" "}
            <select id="incidentType" className="form-control">
              <option>Overflowing Bin</option>
              <option>Illegal Dumping</option>
              <option>Missed Collection</option>
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
              placeholder="e.g., Sector 15, Gurgaon"
              required
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
    </div>
  );
};

export default function HomePage() {
  const [activePage, setActivePage] = useState<string>("dashboard");
  const [user, setUser] = useState<UserState>(initialUserState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsModalOpen(false);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUser((prevUser) => ({ ...prevUser, role: newRole }));
  };

  const openReportModal = () => setIsModalOpen(true);
  const closeReportModal = () => setIsModalOpen(false); // Function to render the correct component

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
      case "dashboard":
      default:
        return <Dashboard userRole={user.role} />;
    }
  };

  return (
    <>
      {" "}
      <Header
        activePage={activePage}
        onNavClick={handleNavClick}
        userRole={user.role}
        onRoleChange={handleRoleChange}
        onReportClick={openReportModal}
      />
      <main className="main">        {renderPage()}      </main>
      <BottomNav activePage={activePage} onNavClick={handleNavClick} />
      {/* Report Waste Modal */}
      <ReportWasteModal isOpen={isModalOpen} onClose={closeReportModal} />
      {" "}
    </>
  );
}
