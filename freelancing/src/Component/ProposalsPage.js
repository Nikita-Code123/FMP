import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/proposals.css';
import Swal from 'sweetalert2';
const ProposalsPage = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('userId');
  const [ok,setOk]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      if (!employeeId || !token) {
        setError(new Error('Missing parameters or authentication token.'));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/proposal/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Filter proposals with status 'pending'
        const pendingProposals = response.data.proposal.filter(proposal => proposal.status === 'pending');
        setProposals(pendingProposals);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        const errorMessage = err.response?.data?.message || 'Unknown error occurred';
        // setError(new Error(errorMessage));
        setLoading(false);
      }
    };

    fetchProposals();
  }, [employeeId, token]);

  const handleAccept = async (proposalId) => {
    if (!proposalId) {
      toast.error('Proposal ID is missing.', {
        style: {
          position: "top-center",
          backgroundColor: '#9b2226',
          color: 'white',
          fontSize: '16px',
          borderRadius: '5px'
        }
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/FreelancerMarketplace/Employee/accept/${proposalId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        title: 'Success! 🎉',
        text: 'This proposal has been accepted successfully.',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
      // handleMakePayment();

      // Update the state to remove the accepted proposal
      setProposals(prevProposals => prevProposals.filter(proposal => proposal.id !== proposalId));
    } catch (err) {
      console.error('Failed to accept proposal:', err);
      toast.error('Failed to accept proposal.', {
        style: {
          position: "top-center",
          backgroundColor: '#9b2226',
          color: 'white',
          fontSize: '16px',
          borderRadius: '5px'
        }
      });
    }
  };

  const handleReject = async (proposalId) => {
    if (!proposalId) {
      toast.error('Proposal ID is missing.', {
        style: {
          position: "top-center",
          backgroundColor: '#9b2226',
          color: 'white',
          fontSize: '16px',
          borderRadius: '5px'
        }
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/FreelancerMarketplace/Employee/reject/${proposalId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      toast.success('Proposal successfully rejected!', {
        style: {
          position: "top-center",
          backgroundColor: '#012a4a',
          color: 'white',
          fontSize: '16px',
          borderRadius: '5px'
        }
      });

      // Update the state to remove the rejected proposal
      setProposals(prevProposals => prevProposals.filter(proposal => proposal.id !== proposalId));
    } catch (err) {
      console.error('Failed to reject proposal:', err);
      toast.error('Failed to reject proposal.', {
        style: {
          position: "top-center",
          backgroundColor: '#9b2226',
          color: 'white',
          fontSize: '16px',
          borderRadius: '5px'
        }
      });
    }
  };

 
const handleOK=()=>{
  setOk(true);
}
if(ok){
  navigate('/dashboard/employee')
}
  if (loading) return <p className="loading">Loading...</p>;
  // if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

  return (
    <div className="proposals-page">
      <ToastContainer />
      {/* <h1>Proposals</h1> */}
      <div className="proposals-list">
        {proposals.length > 0 ? (
          proposals.map(proposal => (
            <div key={proposal.id} className="proposal-card">
              <h2>{proposal.project ? proposal.project.projectName : 'No Project Name'}</h2>
              <p><strong>Project Description:</strong> {proposal.project ? proposal.project.description : 'No Description'}</p>
              <p><strong>Freelancer Email:</strong> {proposal.user ? proposal.user.email : 'No Email'}</p>
              <p><strong>Freelancer Name:</strong> {proposal.user ? proposal.user.username : 'No Name'}</p>
              <div className="cover-letter">
                <p><strong>Cover Letter:</strong></p>
                <p>{proposal.coverLetter || 'No Cover Letter'}</p>
              </div>
              <div className="budget-timeline">
                <p><strong>Proposed Budget:</strong> Rs.{proposal.proposedBudget || 'No Budget'}</p>
                <p><strong>Estimated Timeline:</strong> {proposal.estimatedTimeline || 'No Timeline'}</p>
              </div>
              <div className="proposal-actions">
                
                    <button onClick={() => handleAccept(proposal.id)} className="btn btn-success">Accept</button>
                    <button onClick={() => handleReject(proposal.id)} className="btn btn-danger">Reject</button>
                  
              </div>
            </div>
          ))
        ) : (
          <><p className='no'>No proposals available.</p>
          <button id='ok' onClick={handleOK}>OK</button></>
         
        )}
      </div>
    </div>
  );
};

export default ProposalsPage;
