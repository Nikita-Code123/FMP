import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/dashboard.employee.css';
import ProjectStatusE from './ProjectStatusE.js'; 
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const employeeId = localStorage.getItem('userId');

        if (!employeeId || !token) {
          toast.error('Authentication required. Please log in again.');
          navigate('/login');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Employee/post/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setPosts(response.data.posts || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        // setError(err);
        setLoading(false);
        // toast.error('Error fetching posts. Please try again.');
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Authentication required. Please log in again.');
        navigate('/login');
        return;
      }

      const response = await axios.delete(`http://localhost:8000/FreelancerMarketplace/Employee/deletepost/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== postId));
        toast.success('Post deleted successfully!');
      } else {
        toast.error('Failed to delete post. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Error deleting post. Please try again.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  // if (error) return <p className="error">Error: {error.message || 'Unknown error occurred'}</p>;

  return (
    <div className="combined-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <a className="navbar-brand" href="#">Freelance Marketplace</a>
        <div className="searchCon">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchh"
          />
          <button className="searching" type="button">
            <i className="search-icon fas fa-search"></i>
          </button>
        </div>
        <div className="nav-buttons">
          <button className='nav-btn' type='button' onClick={() => navigate('/post')}>Create Project</button>
          <button className='nav-btn' type='button' onClick={() => navigate('/profile/employee')}>Profile</button>
          <button className='nav-btn' type='button' onClick={() => navigate('/proposals')}>View Proposals</button>
          <button className='nav-btn nav-btn-logout' type='button' onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');
          }}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="left-panel">
          <div className="view-post">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-details">
                  <h2 className='projName'>{post.projectName}</h2>
                  <p><strong>Job Title:</strong> {post.jobTitle}</p>
                  <p><strong>Description:</strong> {post.description}</p>
                  <p><strong>Date:</strong> {post.date}</p>
                  <p><strong>Skills Required:</strong> {post.skills}</p>
                  <p><strong>Budget:</strong> {post.budget}</p>
                  <p><strong>Deadline:</strong> {post.deadline}</p>
                  <div className="post-actions">
                    <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>You have no posts yet...</p>
            )}
          </div>
        </div>
        <div className="right-panel">
          <ProjectStatusE />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
