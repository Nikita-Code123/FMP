import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import '../styles/proposalform.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProposalForm = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const { employeeId } = location.state || {}; 
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [estimatedTimeline, setEstimatedTimeline] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const freelancerId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.error('Employee ID is missing.');
      return;
    }

    try {
      console.log('Submitting Proposal:', {
        freelancerId,
        projectId,
        employeeId,
        coverLetter,
        proposedBudget,
        estimatedTimeline
      });
 navigate('/dashboard/freelancer');
      const response = await axios.post(
        'http://localhost:8000/FreelancerMarketplace/Freelancer/projectProposal',
        {
          freelancerId,
          projectId,
          employeeId,
          coverLetter,
          proposedBudget,
          estimatedTimeline
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('Proposal Submitted:', response.data);
      setSuccess(true);
      
      Swal.fire({
        title: 'Success! 🎉',
        text: 'Your proposal has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
      navigate('/dashboard/freelancer');
    } catch (err) {
      console.error('Error submitting proposal:', err.response?.data || err.message);
      if (err.response?.status === 400 && err.response?.data?.error === 'You have already submitted a proposal for this project.') {
        // toast.error('You have already submitted a proposal for this project.');
        Swal.fire({
          title: 'OOps !',
          text: 'Yo have already submmitted a proposal for this project',
          icon: 'info',
          confirmButtonText: 'OK'
        });
        navigate('/dashboard/freelancer');
      } else {
        toast.error('Failed to submit proposal.');
      }
    }
  };

  return (
    <div className="proposal-form">
      <h1>Submit Your Proposal</h1>
      {success && <p className="success">Proposal submitted successfully!</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write a brief cover letter for your proposal..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="proposedBudget">Proposed Budget</label>
          <input
            type="number"
            id="proposedBudget"
            value={proposedBudget}
            onChange={(e) => setProposedBudget(e.target.value)}
            placeholder="Enter your proposed budget"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="estimatedTimeline">Estimated Timeline</label>
          <input
            type="date"
            id="estimatedTimeline"
            value={estimatedTimeline}
            onChange={(e) => setEstimatedTimeline(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProposalForm;
