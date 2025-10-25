// components/Tracking.tsx
import React, { useState } from 'react';
import { appData, Facility, WasteBin } from '../../lib/data';

// --- Local Component Definitions ---

// Type for the filter state
type FacilityType = 'all' | 'Waste-to-Energy' | 'Biogas' | 'Recycling' | 'Composting';
type BinType = 'all' | 'needs_collection' | 'overflowing' | 'ok';

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const statusClass = `status-${facility.status.replace(/_/g, '-')}`;
  return (
    <div className="facility-marker">
      <div className="facility-name">{facility.name} ({facility.type})</div>
      <div className="facility-location">
        <i className="fas fa-map-marker-alt"></i>
        <span>{facility.location}</span>
      </div>
      <p>Capacity: **{facility.capacity}** TPD</p>
      <div style={{ marginTop: '8px' }}>
        Status: 
        <span className={`facility-status-indicator ${statusClass}`}></span>
        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
          {facility.status.replace(/_/g, ' ')}
        </span>
      </div>
    </div>
  );
};

interface BinCardProps {
    bin: WasteBin;
}

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


// --- Main Tracking Component ---

const Tracking: React.FC = () => {
  const [facilityFilter, setFacilityFilter] = useState<FacilityType>('all');
  const [binFilter, setBinFilter] = useState<BinType>('needs_collection');

  // Filter Facilities based on the selected type
  const filteredFacilities = appData.facilities.filter(facility => 
    facilityFilter === 'all' || facility.type === facilityFilter
  );

  // Filter Bins based on the selected status
  const filteredBins = appData.wasteBins.filter(bin => 
    binFilter === 'all' || bin.status === binFilter
  );
  
  // List of all facility types for the filter buttons
  const facilityTypes: FacilityType[] = ['all', 'Waste-to-Energy', 'Biogas', 'Recycling', 'Composting'];
  const binStatuses: BinType[] = ['needs_collection', 'overflowing', 'ok', 'all'];


  return (
    <div className="page page--active" id="tracking">
      <div className="container">
        <h1 className="page-header">Waste Tracking & Facility Monitoring</h1>

        {/* Map Placeholder */}
        <div className="map-placeholder">
          <i className="fas fa-globe-asia"></i> 
          <span>Interactive Map Placeholder</span>
        </div>

        {/* Facilities Section */}
        <section className="section">
          <h2 className="section-title">Facility Locations</h2>
          
          <div className="tracking-controls">
            {facilityTypes.map(type => (
              <button
                key={type}
                className={`btn btn--secondary btn--small ${facilityFilter === type ? 'filter-btn active' : ''}`}
                onClick={() => setFacilityFilter(type)}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

          <div className="facility-markers">
            {filteredFacilities.map(facility => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
            {filteredFacilities.length === 0 && <p>No facilities match the filter.</p>}
          </div>
        </section>

        {/* Smart Bin Section */}
        <section className="section">
            <h2 className="section-title">Smart Bin Status</h2>

            <div className="tracking-controls">
                {binStatuses.map(status => (
                    <button
                        key={status}
                        className={`btn btn--secondary btn--small ${binFilter === status ? 'filter-btn active' : ''}`}
                        onClick={() => setBinFilter(status)}
                    >
                        {status === 'all' ? 'All Bins' : status.replace(/_/g, ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="bin-grid" id="binGrid">
                {filteredBins.map(bin => <BinCard key={bin.id} bin={bin} />)}
                {filteredBins.length === 0 && <p>No bins match the current status filter.</p>}
            </div>
        </section>
      </div>
    </div>
  );
};

export default Tracking;