import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import SignUp from './Component/SignUp.js';
import SignIn from './Component/SignIn.js';
import Dashboard from './Component/Dashboard.employee.js';
import Post from './Component/Post.employee.js';
import UpdatePost from './Component/Updatepost.js';

function App() {
  return (

      <div>
      
        <ToastContainer
          position="top-center" // Center horizontally at the top
          autoClose={1000}
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
      <Route path="/post" element={<Post/>} />
      <Route path="/update/:id" element={<UpdatePost />} /> 
      {/* <Route path="/profile" element={<Profile />} />
    */}
    </Routes>
      </div>

  );
}

export default App;


