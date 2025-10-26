// components/BottomNav.tsx
import React from 'react';

interface BottomNavProps {
  activePage: string;
  onNavClick: (pageId: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
  { id: 'training', icon: 'fas fa-graduation-cap', label: 'Training' },
  { id: 'tracking', icon: 'fas fa-map-marker-alt', label: 'Tracking' },
  { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
  { id: 'marketplace', icon: 'fas fa-gift', label: 'Rewards' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavClick }) => {
  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <a 
          key={item.id}
          href={`#${item.id}`} 
          className={`bottom-nav__item ${activePage === item.id ? 'active' : ''}`} 
          data-page={item.id}
          onClick={(e) => {
            e.preventDefault();
            onNavClick(item.id);
          }}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;