import React, { useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { getUser } from '../utils/auth';
import '../styles/pages.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="page-container"><div className="loading">Loading profile...</div></div>;
  }

  return (
    <div className="page-container">
      <div className="profile-container">
        <h1>User Profile</h1>

        {error && <div className="error-message">{error}</div>}

        {user && (
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p className="email">{user.email}</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-section">
                <h3>Account Information</h3>
                <div className="detail-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">User ID:</span>
                  <span className="value">{user.id}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Member Since:</span>
                  <span className="value">{formatDate(user.created_at)}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Quick Links</h3>
                <div className="profile-links">
                  <a href="/swap" className="profile-link">Make a Swap</a>
                  <a href="/history" className="profile-link">View History</a>
                </div>
              </div>

              <div className="detail-section">
                <h3>Security Tips</h3>
                <ul className="security-tips">
                  <li>Never share your password with anyone</li>
                  <li>Use a strong and unique password</li>
                  <li>Log out when using a shared computer</li>
                  <li>Keep your email address up to date</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
