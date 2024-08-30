import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/notifications.css';
import { FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId || !token) {
        setError(new Error('Missing parameters or authentication token.'));
        setLoading(false);
        return;
      }

      try {
        // Fetch proposal status
        const proposalResponse = await axios.get(`http://localhost:8000/FreelancerMarketplace/Employee/status/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const proposals = proposalResponse.data.proposal || [];

        // Fetch payment status and details
        const paymentResponse = await axios.get(`http://localhost:8000/FreelancerMarketplace/Payment/myPayments/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const payments = paymentResponse.data.payments || [];

        const newNotifications = [];

        // Construct proposal notifications
        proposals.forEach((proposal) => {
          let proposalMessage = '';
          let proposalStatusClass = '';
          let proposalIcon = null;
          const projectName = proposal.project?.projectName || 'Unknown Project';

          switch (proposal.status) {
            case 'accepted':
              proposalMessage = `Your proposal for project "${projectName}" has been accepted.`;
              proposalStatusClass = 'accepted';
              proposalIcon = <FaCheckCircle />;
              break;
            case 'rejected':
              proposalMessage = `Your proposal for project "${projectName}" has been rejected.`;
              proposalStatusClass = 'rejected';
              proposalIcon = <FaTimesCircle />;
              break;
            default:
              proposalMessage = `Your proposal for project "${projectName}" is still pending.`;
              proposalStatusClass = 'pending';
              proposalIcon = <FaClock />;
          }

          newNotifications.push({
            type: 'proposal',
            message: proposalMessage,
            statusClass: proposalStatusClass,
            icon: proposalIcon,
            timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
          });
        });

        // Construct payment notifications
        payments.forEach((payment) => {
          let paymentMessage = '';
          let paymentStatusClass = '';
          let paymentIcon = null;
          const projectName = payment.project?.projectName || 'Unknown Project';
          const paymentAmount = payment.amount || 0;
          const paymentStatus = payment.status || 'No Payments';

          if (paymentStatus === 'Done') {
            paymentMessage = `Your payment of Rs. ${paymentAmount} has been completed for project "${projectName}".`;
            paymentStatusClass = 'payment-done';
            paymentIcon = <FaMoneyBillWave />;
          } else if (paymentStatus === 'Pending') {
            paymentMessage = `Your payment is still pending for project "${projectName}".`;
            paymentStatusClass = 'payment-pending';
            paymentIcon = <FaClock />;
          } else {
            paymentMessage = 'No payment information available.';
            paymentStatusClass = '';
            paymentIcon = <MdError />;
          }

          newNotifications.push({
            type: 'payment',
            message: paymentMessage,
            statusClass: paymentStatusClass,
            icon: paymentIcon,
            timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
          });
        });

        setNotifications(newNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err.response ? new Error(err.response.data.message) : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 30000);

    return () => clearInterval(intervalId);
  }, [userId, token]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message || 'Unknown error occurred'}</p>;

  return (
    <div className="notifications-page">
      <ToastContainer />
      <h1>Notifications</h1>
      <div className="notification-container">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className={`notification-box ${notification.type} ${notification.statusClass}`}>
              <span className="notification-icon">{notification.icon}</span>
              <span className="notification-message">{notification.message}</span>
              <span className="notification-timestamp">{notification.timestamp}</span>
            
              <span className="notification-date">{notification.date}</span>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
