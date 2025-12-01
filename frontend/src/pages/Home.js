import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import '../styles/pages.css';

const Home = () => {
  return (
    <div className="page-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BitPort</h1>
          <p>Your gateway to seamless crypto exchange</p>
          <p className="subtitle">Exchange cryptocurrencies at real-time prices with our secure platform</p>

          {isAuthenticated() ? (
            <Link to="/swap" className="cta-button primary-btn">
              Start Swapping
            </Link>
          ) : (
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary-btn">
                Get Started
              </Link>
              <Link to="/login" className="cta-button secondary-btn">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose BitPort?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Prices</h3>
            <p>Get live cryptocurrency prices from CoinGecko API</p>
          </div>
          <div className="feature-card">
            <h3>Secure Transactions</h3>
            <p>JWT authentication and bcrypt password hashing</p>
          </div>
          <div className="feature-card">
            <h3>Quick Swaps</h3>
            <p>Instant cryptocurrency exchanges with fair rates</p>
          </div>
          <div className="feature-card">
            <h3>Transaction History</h3>
            <p>Complete history of all your swaps with filtering</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h3>100%</h3>
          <p>Secure</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Available</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Cryptos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
