import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/viewproject.css'; // Import the CSS file

const FreelancerViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/FreelancerMarketplace/Freelancer/projects');
        setProjects(response.data.projects || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSendProposal = (projectId, employeeId) => {
    navigate(`/send-proposal/${projectId}`, { state: { employeeId } });
    console.log(employeeId)
  };
  
  
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

  return (
    <div className="view-projects">
      {/* <h1>Projects</h1> */}
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="project-details">
            <h2>{project.projectName}</h2>
            <p><strong>Job Title:</strong> {project.jobTitle}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Skills Required:</strong> {project.skills}</p>
            <p><strong>Budget:</strong> {project.budget}</p>
            <p><strong>Deadline:</strong> {project.deadline}</p>

            {project.employee && (
              <>
                <p><strong>Employee Username:</strong> {project.employee.username}</p>
                <p><strong>Employee Email:</strong> {project.employee.email}</p>
              </>
            )}
            <button 
              onClick={() => handleSendProposal(project.id, project.employeeId)} 
              className="btn btn-primary"
            >
              Send Proposal
            </button>
          </div>
        ))
      ) : (
        <p>No projects found...</p>
      )}
    </div>
  );
};

export default FreelancerViewProject;
