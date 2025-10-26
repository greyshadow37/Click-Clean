"use client";

// components/Tracking.tsx
import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { appData, Department, CivicIssue } from '../../lib/data';

// --- Local Component Definitions ---

// Google Maps configuration
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 28.6139, // Delhi coordinates as default
  lng: 77.2090
};

// Type for the filter state
type DepartmentType = 'all' | 'Public Works' | 'Infrastructure' | 'Utilities' | 'Maintenance';
type IssueType = 'all' | 'pending' | 'in_progress' | 'resolved';

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const statusClass = `status-${department.status.replace(/_/g, '-')}`;
  return (
    <div className="facility-marker">
      <div className="facility-name">{department.name} ({department.type})</div>
      <div className="facility-location">
        <i className="fas fa-map-marker-alt"></i>
        <span>{department.location}</span>
      </div>
      <div style={{ marginTop: '8px' }}>
        Status: 
        <span className={`facility-status-indicator ${statusClass}`}></span>
        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
          {department.status.replace(/_/g, ' ')}
        </span>
      </div>
    </div>
  );
};

interface IssueCardProps {
    issue: CivicIssue;
}

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


// --- Main Tracking Component ---

const Tracking: React.FC = () => {
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentType>('all');
  const [issueFilter, setIssueFilter] = useState<IssueType>('all');
  const [selectedMarker, setSelectedMarker] = useState<Department | CivicIssue | null>(null);

  // Generate stable random offsets for departments and issues without coordinates
  const randomOffsets = useMemo(() => {
    const offsets: { [key: string]: { lat: number; lng: number } } = {};
    
    appData.departments.forEach((dept, index) => {
      if (!dept.latitude || !dept.longitude) {
        offsets[`dept-${dept.id}`] = {
          lat: (Math.random() - 0.5) * 0.1,
          lng: (Math.random() - 0.5) * 0.1
        };
      }
    });
    
    appData.civicIssues.forEach((issue, index) => {
      if (!issue.latitude || !issue.longitude) {
        offsets[`issue-${issue.id}`] = {
          lat: (Math.random() - 0.5) * 0.1,
          lng: (Math.random() - 0.5) * 0.1
        };
      }
    });
    
    return offsets;
  }, []);

  // Filter Departments based on the selected type
  const filteredDepartments = appData.departments.filter(department => 
    departmentFilter === 'all' || department.type === departmentFilter
  );

  // Filter Issues based on the selected status
  const filteredIssues = appData.civicIssues.filter(issue => 
    issueFilter === 'all' || issue.status === issueFilter
  );
  
  // List of all department types for the filter buttons
  const departmentTypes: DepartmentType[] = ['all', 'Public Works', 'Infrastructure', 'Utilities', 'Maintenance'];
  const issueStatuses: IssueType[] = ['all', 'pending', 'in_progress', 'resolved'];


  return (
    <div className="page page--active" id="tracking">
      <div className="container">
        <h1 className="page-header">Civic Issue Tracking & Department Monitoring</h1>

        {/* Interactive Map */}
        <div className="section">
          <h2 className="section-title">Interactive Map</h2>
          {GOOGLE_MAPS_API_KEY ? (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={12}
                onClick={() => setSelectedMarker(null)}
              >
                {/* Department Markers */}
                {filteredDepartments.map((department) => (
                  <Marker
                    key={`dept-${department.id}`}
                    position={{
                      lat: department.latitude || defaultCenter.lat + (randomOffsets[`dept-${department.id}`]?.lat || 0),
                      lng: department.longitude || defaultCenter.lng + (randomOffsets[`dept-${department.id}`]?.lng || 0)
                    }}
                    onClick={() => setSelectedMarker(department)}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${
                            department.status === 'operational' ? '#28a745' :
                            department.status === 'under_maintenance' ? '#ffc107' : '#dc3545'
                          }"/>
                        </svg>
                      `)}`,
                      scaledSize: new google.maps.Size(32, 32)
                    }}
                  />
                ))}

                {/* Issue Markers */}
                {filteredIssues.map((issue) => (
                  <Marker
                    key={`issue-${issue.id}`}
                    position={{
                      lat: issue.latitude || defaultCenter.lat + (randomOffsets[`issue-${issue.id}`]?.lat || 0),
                      lng: issue.longitude || defaultCenter.lng + (randomOffsets[`issue-${issue.id}`]?.lng || 0)
                    }}
                    onClick={() => setSelectedMarker(issue)}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="${
                            issue.status === 'resolved' ? '#28a745' :
                            issue.status === 'in_progress' ? '#ffc107' : '#dc3545'
                          }"/>
                        </svg>
                      `)}`,
                      scaledSize: new google.maps.Size(28, 28)
                    }}
                  />
                ))}

                {/* Info Window for selected marker */}
                {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat: 'latitude' in selectedMarker && selectedMarker.latitude ? selectedMarker.latitude : defaultCenter.lat,
                      lng: 'longitude' in selectedMarker && selectedMarker.longitude ? selectedMarker.longitude : defaultCenter.lng
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div style={{ maxWidth: '200px' }}>
                      {'type' in selectedMarker && 'name' in selectedMarker ? (
                        // It's a department
                        <div>
                          <h4 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                            {selectedMarker.name}
                          </h4>
                          <p style={{ margin: '4px 0' }}><strong>Type:</strong> {selectedMarker.type}</p>
                          <p style={{ margin: '4px 0' }}><strong>Location:</strong> {selectedMarker.location}</p>
                          <p style={{ margin: '4px 0' }}>
                            <strong>Status:</strong>
                            <span style={{
                              color: selectedMarker.status === 'operational' ? '#28a745' :
                                     selectedMarker.status === 'under_maintenance' ? '#ffc107' : '#dc3545',
                              fontWeight: 'bold'
                            }}>
                              {selectedMarker.status.replace(/_/g, ' ').toUpperCase()}
                            </span>
                          </p>
                        </div>
                      ) : (
                        // It's an issue
                        <div>
                          <h4 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                            {selectedMarker.type} Issue
                          </h4>
                          <p style={{ margin: '4px 0' }}><strong>Location:</strong> {selectedMarker.location}</p>
                          <p style={{ margin: '4px 0' }}><strong>Status:</strong> {selectedMarker.status.replace(/_/g, ' ').toUpperCase()}</p>
                          <p style={{ margin: '4px 0' }}><strong>Priority:</strong> {selectedMarker.priority.toUpperCase()}</p>
                          <p style={{ margin: '4px 0' }}><strong>Reported:</strong> {selectedMarker.date_reported}</p>
                        </div>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            <div className="map-placeholder">
              <i className="fas fa-globe-asia"></i>
              <span>Interactive Map</span>
              <p style={{ fontSize: '14px', marginTop: '8px', color: 'var(--color-text-secondary)' }}>
                To enable Google Maps, add your API key to <code>.env.local</code>
              </p>
            </div>
          )}
          {GOOGLE_MAPS_API_KEY && (
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Green markers: Departments | Colored markers: Issues (Green: Resolved, Yellow: In Progress, Red: Pending)
            </p>
          )}
        </div>

        {/* Departments Section */}
        <section className="section">
          <h2 className="section-title">Department Locations</h2>
          
          <div className="tracking-controls">
            {departmentTypes.map(type => (
              <button
                key={type}
                className={`btn btn--secondary btn--small ${departmentFilter === type ? 'filter-btn active' : ''}`}
                onClick={() => setDepartmentFilter(type)}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

          <div className="facility-markers">
            {filteredDepartments.map(department => (
              <DepartmentCard key={department.id} department={department} />
            ))}
            {filteredDepartments.length === 0 && <p>No departments match the filter.</p>}
          </div>
        </section>

        {/* Civic Issues Section */}
        <section className="section">
            <h2 className="section-title">Reported Issues</h2>

            <div className="tracking-controls">
                {issueStatuses.map(status => (
                    <button
                        key={status}
                        className={`btn btn--secondary btn--small ${issueFilter === status ? 'filter-btn active' : ''}`}
                        onClick={() => setIssueFilter(status)}
                    >
                        {status === 'all' ? 'All Issues' : status.replace(/_/g, ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="bin-grid" id="binGrid">
                {filteredIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
                {filteredIssues.length === 0 && <p>No issues match the current status filter.</p>}
            </div>
        </section>
      </div>
    </div>
  );
};

export default Tracking;