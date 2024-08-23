import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      }
    };

    fetchPosts();
  }, [employeeId]);

  const handleUpdate = (postId) => {
    navigate(`/update/${postId}`); // Navigate to the update page with postId
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
            <button onClick={() => handleUpdate(post.id)} className="btn btn-primary">Update</button>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default ViewPost;
