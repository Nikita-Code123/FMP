import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeRatingsList from '../Component/EmployeeRatingList.js'; // Import the ratings component
import '../styles/profile.employee.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const { employeeId } = useParams(); // Extract employeeId from URL parameters

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('User ID not found in localStorage');
          setLoading(false);
          return;
        }

        if (!token) {
          setError('Token not found. Please log in again.');
          navigate('/login'); // Redirect to login if no token
          setLoading(false);
          return;
        }

        const userResponse = await axios.get(`http://localhost:8000/FreelancerMarketplace/Employee/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in headers
          }
        });

        setUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate('/dashboard/employee')}>
        &larr; Back to Dashboard
      </button>
      <div className="profile-card">
        <div className="profile-header">
          <h1>{user.username}</h1>
          <p className="profile-status">Status: Employee</p>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      </div>
      <div className="ratings-section">
        
      </div>
      <EmployeeRatingsList employeeId={user.id} />
    </div>
  );
};

export default Profile;
