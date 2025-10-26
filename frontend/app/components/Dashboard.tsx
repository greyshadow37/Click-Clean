import React from 'react';
import { appData, CivicIssue, UserRole } from '../../lib/data';

interface DashboardProps {
  userRole: UserRole;
}

interface StatCardProps {
  iconClass: string;
  value: number;
  label: string;
  isWarning?: boolean;
}

interface ProgressItemProps {
  title: string;
  percentage: number;
}

interface IssueCardProps {
  issue: CivicIssue;
}

const formatNumber = (num: number): string => num.toLocaleString('en-IN');

const StatCard: React.FC<StatCardProps> = ({ iconClass, value, label, isWarning = false }) => (
  <div className={`stat-card ${isWarning ? 'stat-card--warning' : ''}`}>
    <div className="stat-icon">
      <i className={iconClass}></i>
    </div>
    <div className="stat-content">
      <h3 className="stat-value">{formatNumber(value)}</h3>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

const ProgressItem: React.FC<ProgressItemProps> = ({ title, percentage }) => (
  <div className="progress-item">
    <div className="progress-header">
      <span className="progress-title">{title}</span>
      <span className="progress-percentage">{percentage}%</span>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  let statusClass = 'status-badge--ok';
  if (issue.status === 'pending') statusClass = 'status-badge--pending';
  else if (issue.status === 'in_progress') statusClass = 'status-badge--in-progress';

  return (
    <div className="bin-card">
      <div className="bin-header">
        <i className="fas fa-exclamation-triangle bin-icon"></i>
        <h4 className="bin-location">{issue.location}</h4>
        <span className={`status-badge ${statusClass}`}>
          {issue.status.replace(/_/g, ' ').toUpperCase()}
        </span>
      </div>
      <div className="bin-details">
        <div className="bin-meta">
          <p>Type: <strong>{issue.type}</strong></p>
          <p>Reported: <strong>{issue.date_reported}</strong></p>
          <p>Priority: <strong>{issue.priority.toUpperCase()}</strong></p>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const stats = appData.civicStatistics;
  const { civicIssues, complaints } = appData;

  return (
    <div className="page page--active" id="dashboard">
      <div className="container">
        <h1 className="page-header">City Issues Overview</h1>

        {/* Key Statistics Cards */}
        <div className="stats-grid">
          <StatCard iconClass="fas fa-clipboard-list" value={stats.dailyReports} label="Daily Reports" />
          <StatCard iconClass="fas fa-check-circle" value={stats.resolvedIssues} label="Resolved Issues" />
          <StatCard iconClass="fas fa-clock" value={stats.pendingIssues} label="Pending Issues" />
          <StatCard iconClass="fas fa-exclamation-triangle" value={stats.averageResolutionTime} label="Avg Resolution (days)" isWarning={stats.averageResolutionTime > 10} />
        </div>

        {/* Progress Indicators */}
        <div className="progress-section">
          <ProgressItem title="Resolution Rate" percentage={Math.round((stats.resolvedIssues / stats.dailyReports) * 100)} />
          <ProgressItem title="Citizen Satisfaction" percentage={stats.citizenSatisfaction} />
        </div>
        
        {/* Dynamic Content Sections */}

        {/* Reporter Tasks (Conditional for Community Reporter role) */}
        {userRole === 'reporter' && (
          <section id="championTasks" className="section">
            <h2 className="section-title">Community Reporter Tasks</h2>
            <div className="champion-tasks-grid">
                <p>Tasks for the Community Reporter role will be displayed here.</p>
            </div>
          </section>
        )}

        {/* Civic Issues Status */}
        <section className="section">
          <h2 className="section-title">Civic Issues Status (Area: {userRole === 'citizen' ? 'Delhi' : userRole.charAt(0).toUpperCase() + userRole.slice(1)})</h2>
          <div className="bin-grid" id="binGrid">
            {civicIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
          </div>
        </section>

        {/* Recent Complaints */}
        <section className="section incident-section">
          <h2 className="section-title">Recent Complaints</h2>
          <div className="incident-reports-list">
            {complaints.map(complaint => (
              <div key={complaint.id} className="incident-card">
                <div className="incident-type">{complaint.type}</div>
                <div className="incident-location"><i className="fas fa-map-marker-alt"></i> {complaint.location}</div>
                <span className={`status-badge status-badge--${complaint.status}`}>{complaint.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;