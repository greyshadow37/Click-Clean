// components/Header.tsx
import React from 'react';
import { UserRole } from '../../lib/data';

interface HeaderProps {
  activePage: string;
  onNavClick: (pageId: string) => void;
  userRole: UserRole;
  onRoleChange: (newRole: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavClick, userRole, onRoleChange }) => {
  const isMunicipal = userRole === 'municipal';
  const buttonText = isMunicipal ? 'Manage Reports' : 'Report Waste';
  const buttonIcon = isMunicipal ? 'fas fa-clipboard-list' : 'fas fa-camera';

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__brand">
          <i className="fas fa-recycle nav__logo"></i>
          <span className="nav__title">Click Clean India</span>
        </div>
        
        <div className="nav__menu" id="navMenu">
          {['dashboard', 'training', 'tracking', 'champions', 'marketplace'].map(page => (
            <a 
              key={page}
              href={`#${page}`} 
              className={`nav__link ${activePage === page ? 'active' : ''}`} 
              data-page={page}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                onNavClick(page);
              }}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </a>
          ))}
        </div>
        
        <div className="nav__controls">
          <div className="user-role-selector">
            <select 
              id="roleSelector" 
              className="form-control"
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
            >
              <option value="citizen">Citizen</option>
              <option value="champion">Green Champion</option>
              <option value="municipal">Municipal Officer</option>
              <option value="facility">Facility Manager</option>
            </select>
          </div>
          <button className="btn btn--primary" id="reportBtn">
            <i className={buttonIcon}></i>
            {buttonText}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;