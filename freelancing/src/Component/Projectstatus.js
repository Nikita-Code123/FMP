// src/components/ProposalsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/projectstatus.css';
import { Link, useNavigate } from 'react-router-dom';

const Projectstatus = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use navigate to handle routing

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const freelancerId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                if (!freelancerId || !token) {
                    toast.error('Authentication required. Please log in again.');
                    return;
                }

                const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/status/${freelancerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data)
                const acceptedProposals = response.data.proposal.filter(p => p.status === 'accepted');
                setProposals(acceptedProposals);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching proposals:', err);
                // setError(err);
                setLoading(false);
                // toast.error('Error fetching proposals. Please try again.');
            }
        };

        fetchProposals();
    }, []);



    if (loading) return <p className="loading">Loading...</p>;
    // if (error) return <p className="error">Error: {error.message || 'Unknown error occurred'}</p>;

    return (
        <div className="proposals-page">
            <h1>Accepted Proposals</h1>
            {proposals.length > 0 ? (
                proposals.map(proposal => (
                    <div key={proposal.id} className="proposal-card">
                        <h2>{proposal.project.projectName}</h2>
                        <p><strong>Project Description:</strong> {proposal.project.description}</p>
                        <p><strong>Employee Name:</strong> {proposal.employee.username}</p>
                        <p><strong>Status:</strong> {proposal.status}</p>

                        <Link to={`/update-status/${proposal.id}`} className="update-btn">
                            Update Project Status
                        </Link>
                    </div>
                ))
            ) : (
                <p>No accepted proposals found.</p>
            )}
        </div>
    );
};

export default Projectstatus;
