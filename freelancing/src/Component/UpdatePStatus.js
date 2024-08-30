import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'react-toastify/dist/ReactToastify.css';
import '../styles/updatepstatus.css'; // Ensure your CSS file is in the correct path

const UpdatePStatus = () => {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false); // New state for button
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPro = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          toast.error('Authentication required. Please log in again.');
          navigate("/");
          return;
        }

        const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/a-proposal/${proposalId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setProposal(response.data.proposal);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError(err);
        setLoading(false);
        toast.error('Error fetching proposal details. Please try again.');
      }
    };

    fetchPro();
  }, [proposalId]);

  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Authentication required. Please log in again.');
        navigate("/");
        return;
      }

      if (proposal.projectstatus === 'completed') {
        Swal.fire({
          title: 'Already Completed',
          text: 'This project has already been marked as completed.',
          icon: 'info',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        });
        navigate('/dashboard/freelancer')
        return;
      }

      // Show SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to mark this project as completed?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, mark as completed!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        setButtonDisabled(true); // Disable button after confirmation

        const response = await axios.put(`http://localhost:8000/FreelancerMarketplace/Freelancer/updateProjectstatus/${proposalId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          Swal.fire(
            'Completed!',
            'Project status has been updated to completed.',
            'success'
          );
          navigate('/dashboard/freelancer');
        } else {
          toast.error('Failed to update project status. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error updating project status:', err);
      toast.error('Error updating project status. Please try again.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message || 'Unknown error occurred'}</p>;

  return (
    <div className="update-status-page">
      <h1>Update Project Status</h1>
      {proposal ? (
        <div className="proposal-details">
          <h2>{proposal.project.projectName}</h2>
          <p><strong>Project Description:</strong> {proposal.project.description}</p>
          <p><strong>Employee Name:</strong> {proposal.employee.name}</p>
          <p><strong>Status:</strong> {proposal.status}</p>
          {proposal.status === 'completed' ? (
            <p className="task-done">Task Done</p> // Display "Task Done" if status is completed
          ) : (
            <button
              className="updatebtn"
              onClick={handleUpdateStatus}
              disabled={buttonDisabled} // Disable if buttonDisabled is true
            >
              Mark as Completed
            </button>
          )}
        </div>
      ) : (
        <p>No proposal details found.</p>
      )}
    </div>
  );
};

export default UpdatePStatus;
