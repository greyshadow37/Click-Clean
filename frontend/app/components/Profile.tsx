"use client";

import React, { useState } from 'react';
import { useAuth } from './Auth';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    return (
      <div className="page page--active" id="profile">
        <div className="container">
          <h1 className="page-header">Profile</h1>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'citizen': return 'Citizen';
      case 'reporter': return 'Community Reporter';
      case 'municipal': return 'Municipal Officer';
      case 'admin': return 'Administrator';
      default: return role;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'citizen':
        return 'Report civic issues and track their resolution in your community.';
      case 'reporter':
        return 'Help identify and report issues, earn rewards for your contributions.';
      case 'municipal':
        return 'Manage and resolve civic issues in your jurisdiction.';
      case 'admin':
        return 'Oversee the entire platform and manage users and departments.';
      default:
        return '';
    }
  };

  return (
    <div className="page page--active" id="profile">
      <div className="container">
        <h1 className="page-header">My Profile</h1>

        <div className="profile-card" style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--border-radius-md)',
          padding: 'var(--space-24)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'var(--space-24)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              marginRight: 'var(--space-16)'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: '0 0 var(--space-8) 0', fontSize: '24px' }}>
                {user.name}
              </h2>
              <p style={{
                margin: '0',
                color: 'var(--color-text-secondary)',
                fontSize: '16px'
              }}>
                {getRoleDisplayName(user.role)}
              </p>
            </div>
          </div>

          <div style={{
            padding: 'var(--space-16)',
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--border-radius-sm)',
            marginBottom: 'var(--space-24)'
          }}>
            <h3 style={{ margin: '0 0 var(--space-12) 0', fontSize: '18px' }}>
              Role Information
            </h3>
            <p style={{ margin: '0', color: 'var(--color-text-secondary)' }}>
              {getRoleDescription(user.role)}
            </p>
          </div>

          <div className="profile-details">
            <h3 style={{ marginBottom: 'var(--space-16)', fontSize: '18px' }}>
              Account Details
            </h3>

            <div style={{ marginBottom: 'var(--space-16)' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: 'var(--space-4)',
                color: 'var(--color-text-primary)'
              }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  style={{ width: '100%' }}
                />
              ) : (
                <p style={{ margin: '0', color: 'var(--color-text-secondary)' }}>
                  {user.name}
                </p>
              )}
            </div>

            <div style={{ marginBottom: 'var(--space-16)' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: 'var(--space-4)',
                color: 'var(--color-text-primary)'
              }}>
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  style={{ width: '100%' }}
                />
              ) : (
                <p style={{ margin: '0', color: 'var(--color-text-secondary)' }}>
                  {user.email}
                </p>
              )}
            </div>

            <div style={{ marginBottom: 'var(--space-16)' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: 'var(--space-4)',
                color: 'var(--color-text-primary)'
              }}>
                Role
              </label>
              <p style={{ margin: '0', color: 'var(--color-text-secondary)' }}>
                {getRoleDisplayName(user.role)}
              </p>
            </div>
          </div>

          <div className="profile-actions" style={{
            display: 'flex',
            gap: 'var(--space-12)',
            marginTop: 'var(--space-24)'
          }}>
            {isEditing ? (
              <>
                <button
                  className="btn btn--primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="btn btn--secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name);
                    setEmail(user.email);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn--secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn--error"
                  onClick={logout}
                  style={{
                    backgroundColor: 'var(--color-error)',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;