import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import FreelancerViewProject from './ViewProject';

const DashboardF = () => {
  return (
    <><div className="dashboard-container">
    <header className="dashboard-header">
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Freelance Marketplace</a>
          <form className="d-flex" role="search">
            <input
              className="search me-2"
              type="search"
              placeholder="Search Jobs..."
              aria-label="Search"
            />
            <button className="searchBtn" type="button">
              Search
            </button>
            <Link to="/post" className="btn-post">
              Proposals
            </Link>
            <Link to="/profile/freelancer" className="btn-profile">
              Profile
            </Link>
          </form>
        </div>
      </nav>
    </header>
  </div>
  <FreelancerViewProject/></>
    
  );
};

export default DashboardF;
