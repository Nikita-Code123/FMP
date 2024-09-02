import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { enIN } from 'date-fns/locale';
import '../styles/viewproject.css'; // Import the CSS file

// Function to format dates in DD/MM/YYYY format using date-fns
const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd/MM/yyyy', { locale: enIN });
};

const FreelancerViewProject = ({ searchQuery }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/FreelancerMarketplace/Freelancer/projects');
        setProjects(response.data.projects || []);
        setFilteredProjects(response.data.projects || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on search query
    const filtered = projects.filter(project =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const handleSendProposal = (projectId, employeeId) => {
    navigate(`/send-proposal/${projectId}`, { state: { employeeId } });
    console.log(employeeId);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

  return (
    <div className="view-projects">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <div key={project.id} className="project-details">
            <h2>{project.projectName}</h2>
            <p><strong>Job Title:</strong> {project.jobTitle}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Skills Required:</strong> {project.skills}</p>
            <p><strong>Budget:</strong> Rs. {project.budget}</p>
            <p><strong>Deadline:</strong> {formatDate(project.deadline)}</p>

            {project.employee && (
              <>
                <p><strong>Employee Name:</strong> {project.employee.username}</p>
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
