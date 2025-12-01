import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, isAuthenticated, clearAuthData } from '../utils/auth';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>₿ BitPort</h1>
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          {authenticated ? (
            <>
              <li><Link to="/swap">Swap</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
