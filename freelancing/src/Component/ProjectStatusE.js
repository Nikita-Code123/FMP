import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/projectstatusE.css'; // Add your CSS file for styling

const ProjectStatusE = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProposals = async () => {
    try {
      const token = localStorage.getItem('token');
      const employeeId = localStorage.getItem('userId'); // Assuming the userId is stored in localStorage

      if (!token || !employeeId) {
        setError('Authentication required. Please log in again.');
        return;
      }

      const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/proposal/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setProposals(response.data.proposal);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      // setError('Error fetching proposals. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  // if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="project-status">
      <h1>Project Status</h1>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <div className="proposals-list">
          {proposals.map(proposal => (
            <div key={proposal.id} className="proposal-item">
              <h2>{proposal.project.projectName}</h2>
              <p><strong>Description:</strong> {proposal.project.description}</p>
              <p><strong>Status:</strong> {proposal.projectstatus === 'completed' ? 'Completed' : 'Incomplete'}</p>
              {proposal.projectstatus === 'completed' &&  (
                <Link to={`/payment/${proposal.id}`} className="btn-make-payment">
                  Make Payment
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectStatusE;
