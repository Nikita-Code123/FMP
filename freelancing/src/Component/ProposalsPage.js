// src/pages/ProposalsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/proposals.css'; // Import the CSS file for styling

const ProposalsPage = () => {
  const { postId } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employeeId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/proposal/${employeeId}`);
        setProposal(response.data.proposals || {});
        setLoading(false);
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProposal();
  }, [postId]);

  const handleAccept = async () => {
    // Logic for accepting the proposal
  };

  const handleReject = async () => {
    // Logic for rejecting the proposal
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

  return (
    <div className="proposals-page">
      <h1>Proposal Details</h1>
      {proposal ? (
        <div className="proposal-details">
          <h2>{proposal.project.title}</h2>
          <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
          <p><strong>Project:</strong> {proposal.project.description}</p>
          <p><strong>Proposal:</strong> {proposal.text}</p>
          <div className="proposal-actions">
            <button onClick={handleAccept} className="btn btn-success">Accept</button>
            <button onClick={handleReject} className="btn btn-danger">Reject</button>
          </div>
        </div>
      ) : (
        <p>No proposal details available.</p>
      )}
    </div>
  );
};

export default ProposalsPage;
