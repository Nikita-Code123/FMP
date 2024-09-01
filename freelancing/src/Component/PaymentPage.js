import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCreditCard, FaPaypal, FaBitcoin } from 'react-icons/fa';
import '../styles/payment.css';

const PaymentPage = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isPaid, setIsPaid] = useState(false);
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const proposalResponse = await axios.get(`http://localhost:8000/FreelancerMarketplace/Freelancer/a-proposal/${proposalId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProposal(proposalResponse.data.proposal);

        const paymentResponse = await axios.get(`http://localhost:8000/FreelancerMarketplace/Payment/status/${proposalId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setIsPaid(paymentResponse.data.isPaid);
      } catch (err) {
        setError(err.response ? new Error(err.response.data.message) : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [proposalId, token]);

  const handlePayment = async () => {
    if (!proposal) {
      Swal.fire('Error', 'Proposal data is missing.', 'error');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/FreelancerMarketplace/Payment/createPayment',
        {
          amount: proposal.proposedBudget,
          freelancerId: proposal.user.id,
          status: 'Done',
          paymentMethod: paymentMethod,
          proposalId: proposal.id,
          projectId: proposal.project.id,
          employeeId: employeeId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      Swal.fire('Success', 'Payment processed successfully.', 'success').then(() => {
        // Navigate to the desired page, e.g., dashboard or proposals page
        navigate('/dashboard/employee'); // Replace with the appropriate route
      });
      setIsPaid(true); // Update the local state to reflect payment
    } catch (err) {
      console.error('Payment processing failed:', err);
      Swal.fire('Error', 'Failed to process payment.', 'error');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message || 'Unknown error occurred'}</p>;

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      {proposal ? (
        <div className="payment-details">
          <p><strong>Proposal ID:</strong> {proposalId}</p>
          <p><strong>Freelancer:</strong> {proposal.user.username}</p>
          <p><strong>Amount:</strong> Rs.{proposal.proposedBudget}</p>
          
          {/* Payment Method Selection */}
          <div className="payment-method">
            <p><strong>Select Payment Method:</strong></p>
            <div className="payment-method-options">
              <label>
                <input
                  type="radio"
                  value="Credit Card"
                  checked={paymentMethod === 'Credit Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaCreditCard /> Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaPaypal /> PayPal
              </label>
              <label>
                <input
                  type="radio"
                  value="Bitcoin"
                  checked={paymentMethod === 'Bitcoin'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaBitcoin /> Bitcoin
              </label>
            </div>
          </div>
          
          {isPaid ? (
            <p className="payment-status">Payment has already been processed for this proposal.</p>
          ) : (
            <button onClick={handlePayment} className="btn btn-primary">Proceed to Payment</button>
          )}
        </div>
      ) : (
        <p>Oops ! proposal data not available.</p>
      )}
    </div>
  );
};

export default PaymentPage;
