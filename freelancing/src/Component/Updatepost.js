import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePost = () => {
    const [posts, setPosts] = useState([]); // Array to hold multiple posts
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch all posts (adjust the endpoint as needed)
                const response = await axios.get('http://localhost:8000/FreelancerMarketplace/Employee/posts');
                setPosts(response.data.posts || []);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPosts = [...posts];
        updatedPosts[index] = { ...updatedPosts[index], [name]: value };
        setPosts(updatedPosts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a batch update request
            const response = await axios.put('http://localhost:8000/FreelancerMarketplace/Employee/updatePost', { posts });
            if (response.status === 200) {
                navigate('/dashboard/employee');
                toast.success('Posts updated successfully!');
            } else {
                toast.error('Failed to update posts. Please try again.');
            }
        } catch (error) {
            console.error('Error updating posts:', error);
            toast.error('Error updating posts. Please try again.');
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

    return (
        <div className="container mt-5">
            <h1>Update Multiple Posts</h1>
            <form onSubmit={handleSubmit}>
                {posts.map((post, index) => (
                    <div key={post.id} className="post-form">
                        <h2>Post ID: {post.id}</h2>
                        <div className="form-group mb-3">
                            <label htmlFor={`projectName-${index}`}>Project Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`projectName-${index}`}
                                name="projectName"
                                value={post.projectName}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Enter project name"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={`jobTitle-${index}`}>Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`jobTitle-${index}`}
                                name="jobTitle"
                                value={post.jobTitle}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Enter job title"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={`description-${index}`}>Description</label>
                            <textarea
                                className="form-control"
                                id={`description-${index}`}
                                name="description"
                                value={post.description}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Enter project description"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={`date-${index}`}>Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`date-${index}`}
                                name="date"
                                value={post.date}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={`skills-${index}`}>Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`skills-${index}`}
                                name="skills"
                                value={post.skills}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Enter required skills"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={`budget-${index}`}>Budget</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`budget-${index}`}
                                name="budget"
                                value={post.budget}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Enter budget"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={`deadline-${index}`}>Deadline</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`deadline-${index}`}
                                name="deadline"
                                value={post.deadline}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Update Posts</button>
            </form>
        </div>
    );
};

export default UpdatePost;
