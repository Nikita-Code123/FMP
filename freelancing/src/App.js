import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css'; 
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
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
function App() {
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
        <Route path='/dashboard/freelancer' element ={<DashboardF/>} />
        <Route path="/profile/freelancer" element={<ProfileF />} />
        <Route path="/send-proposal/:projectId" element={<ProposalForm />} />
        <Route path="/proposals" element={<ProposalsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/payment/:proposalId" element={<PaymentPage />} />
        <Route path="/project-status"  element ={<Projectstatus/>} />
        <Route path="/update-status/:proposalId" element={<UpdatePStatus />} />
      </Routes>
    </div>
  );
}

export default App;
