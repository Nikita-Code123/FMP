import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is included
import '../styles/viewpost.employee.css'; // Import the CSS file for ViewPost

const ViewPost = ({ employeeId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!employeeId) return;
      try {
        const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Employee/post/${employeeId}`);
        console.log(response.data); // Log the entire response
        setPosts(response.data.posts || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err);
        setLoading(false);
        toast.error('Error fetching posts. Please try again.');
      }
    };

    fetchPosts();
  }, [employeeId]);

  const handleViewProposals = (postId) => {
    navigate(`/proposals/${postId}`); // Navigate to the proposals page with postId
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/FreelancerMarketplace/Employee/deletepost/${postId}`);
      if (response.status === 200) {
        // Remove the deleted post from the state
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
  if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

  return (
    <div className="view-post">
      <h1>Your Posts Details</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-details">
            <h2>{post.projectName}</h2>
            <p><strong>Job Title:</strong> {post.jobTitle}</p>
            <p><strong>Description:</strong> {post.description}</p>
            <p><strong>Date:</strong> {post.date}</p>
            <p><strong>Skills Required:</strong> {post.skills}</p>
            <p><strong>Budget:</strong> {post.budget}</p>
            <p><strong>Deadline:</strong> {post.deadline}</p>
            <div className="post-actions">
              <button onClick={() => handleViewProposals(post.id)} className="btn btn-info">View Proposals</button>
              <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>You have No post yet...</p>
      )}
    </div>
  );
};

export default ViewPost;
