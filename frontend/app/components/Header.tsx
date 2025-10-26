// components/Header.tsx
import React from 'react';
import { UserRole } from '../../lib/data';

interface HeaderProps {
  activePage: string;
  onNavClick: (pageId: string) => void;
  userRole: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  onReportClick: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavClick,
  userRole,
  onRoleChange,
  onReportClick,
  isAuthenticated,
  onLoginClick,
  onSignupClick
}) => {
  const isMunicipal = userRole === 'municipal' || userRole === 'admin';
  const buttonText = isMunicipal ? 'View Reports' : 'Report Issue';
  const buttonIcon = isMunicipal ? 'fas fa-clipboard-list' : 'fas fa-camera';

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__brand">
          <i className="fas fa-recycle nav__logo"></i>
          <span className="nav__title">Click Clean</span>
        </div>
        
        <div className="nav__menu" id="navMenu">
          {['dashboard', 'training', 'tracking', 'champions', 'marketplace', 'profile'].map(page => (
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
              {page === 'champions' ? 'Reporters' : page === 'marketplace' ? 'Rewards' : page === 'profile' ? 'Profile' : page.charAt(0).toUpperCase() + page.slice(1)}
            </a>
          ))}
        </div>
        
        <div className="nav__controls">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Logged in as {userRole}
              </span>
              <button
                className="btn btn--secondary btn--small"
                onClick={() => onNavClick('profile')}
              >
                Profile
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn--secondary btn--small"
                onClick={onSignupClick}
              >
                Sign Up
              </button>
              <button
                className="btn btn--primary btn--small"
                onClick={onLoginClick}
              >
                Login
              </button>
            </div>
          )}
          <button className="btn btn--primary" id="reportBtn" onClick={onReportClick}>
            <i className={buttonIcon}></i>
            {buttonText}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;