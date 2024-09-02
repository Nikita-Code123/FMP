import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import SignUp from './Component/SignUp.js';
import SignIn from './Component/SignIn.js';
import Dashboard from './Component/Dashboard.employee.js';
import Post from './Component/Post.employee.js';
import Profile from './Component/Profile.employee.js';
import DashboardF from './Component/Dashboard.js';
import ProfileF from './Component/ProfileF.js'
import ProposalForm from './Component/ProposalForm.js';
import ProposalsPage from './Component/ProposalsPage.js';
import NotificationsPage from './Component/Notifications.js';
import PaymentPage from './Component/PaymentPage.js'
import Projectstatus from './Component/Projectstatus.js';
import UpdatePStatus from './Component/UpdatePStatus.js';
import EmployeeRatingForm from './Component/EmployeeRatingForm.js';
import EmployeeRatingsList from './Component/EmployeeRatingList.js';
import ForgotPassword from './Component/ForgetPassword.js';
import UserRatingForm from './Component/UserRatingForm.js';
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenExpirationTime = getTokenExpirationTime(token); // Replace this with your logic to get token expiration time
        const currentTime = Date.now();

        if (currentTime > tokenExpirationTime) {
          localStorage.removeItem("token");
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Your session has expired. Please sign in again.",
          }).then(() => {
            navigate("/signin"); // Redirect to the sign-in page
          });
        }
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard/employee" element={<Dashboard />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile/employee" element={<Profile />} />
        <Route path='/dashboard/freelancer' element={<DashboardF />} />
        <Route path="/profile/freelancer" element={<ProfileF />} />
        <Route path="/send-proposal/:projectId" element={<ProposalForm />} />
        <Route path="/proposals" element={<ProposalsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/payment/:proposalId" element={<PaymentPage />} />
        <Route path="/project-status" element={<Projectstatus />} />
        <Route path="/update-status/:proposalId" element={<UpdatePStatus />} />
        <Route path="/rate/:employeeId" element={<EmployeeRatingForm  />} />
        <Route path ="/forgot-password" element ={<ForgotPassword/>}/>
        <Route path="/rateuser/:userId" element={<UserRatingForm  />} />


      </Routes>
    </div>
  );
}

export default App;

function getTokenExpirationTime(token) {
  // Decode the token and extract the expiration time.
  // This is an example for a JWT token. Adjust this based on how your token stores expiration info.
  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  return tokenPayload.exp * 1000; // Convert to milliseconds
}
