// components/Dashboard.tsx
import React from 'react';
import { appData, WasteBin, UserRole } from '../../lib/data';

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

interface BinCardProps {
  bin: WasteBin;
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

const BinCard: React.FC<BinCardProps> = ({ bin }) => {
  let fillClass = 'fill-circle--ok';
  if (bin.fillLevel > 90) fillClass = 'fill-circle--overflowing';
  else if (bin.fillLevel > 80) fillClass = 'fill-circle--critical';

  return (
    <div className="bin-card">
      <div className="bin-header">
        <i className="fas fa-trash-alt bin-icon"></i>
        <h4 className="bin-location">{bin.location}</h4>
        <span className={`status-badge status-badge--${bin.status.replace('_', '-')}`}>
          {bin.status.replace(/_/g, ' ').toUpperCase()}
        </span>
      </div>
      <div className="bin-details">
        {/* Use style attribute to pass CSS variable for fill level */}
        <div className={`fill-circle ${fillClass}`} style={{'--fill-level': `${bin.fillLevel}%`} as React.CSSProperties}>
          <span>{bin.fillLevel}%</span>
        </div>
        <div className="bin-meta">
          <p>Type: <strong>{bin.type}</strong></p>
          <p>Last Collection: <strong>{bin.lastCollection}</strong></p>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const stats = appData.wasteStatistics;
  const { wasteBins, incidents } = appData;

  return (
    <div className="page page--active" id="dashboard">
      <div className="container">
        <h1 className="page-header">National Waste Overview</h1>

        {/* Key Statistics Cards */}
        <div className="stats-grid">
          <StatCard iconClass="fas fa-trash-alt" value={stats.dailyGeneration} label="TPD Generated" />
          <StatCard iconClass="fas fa-recycle" value={stats.dailyTreatment} label="TPD Treated" />
          <StatCard iconClass="fas fa-mountain" value={stats.landfillDisposal} label="TPD Landfilled" />
          <StatCard iconClass="fas fa-exclamation-triangle" value={stats.unaccounted} label="TPD Unaccounted" isWarning={true} />
        </div>

        {/* Progress Indicators */}
        <div className="progress-section">
          <ProgressItem title="Treatment Efficiency" percentage={stats.treatmentPercentage} />
          <ProgressItem title="Collection Efficiency" percentage={stats.collectionEfficiency} />
        </div>
        
        {/* Dynamic Content Sections */}

        {/* Champion Tasks (Conditional for Green Champion role) */}
        {userRole === 'champion' && (
          <section id="championTasks" className="section">
            <h2 className="section-title">Green Champion Tasks</h2>
            <div className="champion-tasks-grid">
                <p>Tasks for the Green Champion role will be displayed here.</p>
            </div>
          </section>
        )}

        {/* Smart Bin Status */}
        <section className="section">
          <h2 className="section-title">Smart Bin Status (Area: {userRole === 'citizen' ? 'Delhi' : userRole.charAt(0).toUpperCase() + userRole.slice(1)})</h2>
          <div className="bin-grid" id="binGrid">
            {wasteBins.map(bin => <BinCard key={bin.id} bin={bin} />)}
          </div>
        </section>

        {/* Incident Reports */}
        <section className="section incident-section">
          <h2 className="section-title">Recent Incidents</h2>
          <div className="incident-reports-list">
            {incidents.map(incident => (
              <div key={incident.id} className="incident-card">
                <div className="incident-type">{incident.type}</div>
                <div className="incident-location"><i className="fas fa-map-marker-alt"></i> {incident.location}</div>
                <span className={`status-badge status-badge--${incident.severity}`}>{incident.severity.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;