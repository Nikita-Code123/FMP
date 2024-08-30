import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import FreelancerViewProject from './ViewProject';

const DashboardF = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <nav className="navbar">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Freelance Marketplace</a>
              <div className="navbar-buttons">
                <input
                  className="search"
                  type="search"
                  placeholder="Search Jobs..."
                  aria-label="Search"
                />
                <button className="searchBtn" type="button">
                  Search
                </button>
                <Link to="/notifications" className="btn-post">
                  Notifications
                </Link>
                <Link to="/project-status" className="btn-projectStatus">
                  Project Status
                </Link>
                <Link to="/profile/freelancer" className="btn-profile">
                  Profile
                </Link>
                <button className="btn-logout" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <br/>
      <FreelancerViewProject />
    </>
  );
};

export default DashboardF;
