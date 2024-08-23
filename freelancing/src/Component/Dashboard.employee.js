// Dashboard.employee.js
import React from "react";
import Nav from "./Nav.employee.js";
import ViewPost from "./Viewpost.employee.js";
import "../styles/dashboard.employee.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
 
  const user = localStorage.getItem('user');
  let employeeId;
        try {
            const parsedUser = JSON.parse(user);
            employeeId = parsedUser.id;
        } catch (error) {
            console.error('Error parsing user data:', error);
            // toast.error('Error parsing user data.');
            return;
        }

  return (
    <div className="dashboard-container">
       <div>
    </div>
      <Nav />
      <div className="view-post-container">
        <ViewPost employeeId={employeeId} />
      </div>
    </div>
  );
}

export default Dashboard;
