import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../styles/profile.employee.css';

const ProfileF = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Retrieve the user data from localStorage
        const userId = JSON.parse(localStorage.getItem('userId'));

        if (userId) {
        
          const userResponse = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/profile/${userId}`);
          setUser(userResponse.data);
        } else {
          setError('User not found in localStorage');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate('/dashboard/freelancer')}>
        &larr; Back to Dashboard
      </button>
      <div className="profile-card">
        <div className="profile-header">
          <h1>{user.name}</h1>
          <p className="profile-status">Status: Freelancer</p>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileF;
