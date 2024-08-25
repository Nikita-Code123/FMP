import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Get the id from the route params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/Employee/post/${id}`);
                setPost(response.data.post || {});
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/FreelancerMarketplace/Employee/updatePost/${id}`, post);
            if (response.status === 200) {
                navigate('/dashboard/employee');
                toast.success('Post updated successfully!');
            } else {
                toast.error('Failed to update post. Please try again.');
            }
        } catch (error) {
            console.error('Error updating post:', error.response ? error.response.data : error.message);
            toast.error(`Error updating post: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error.message || "Unknown error occurred"}</p>;

    return (
        <div className="container mt-5">
            <h1>Update Post</h1>
            <form onSubmit={handleSubmit}>
                {post && (
                    <div className="post-form">
                        <h2>Post ID: {post.id}</h2>
                        <div className="form-group mb-3">
                            <label htmlFor="projectName">Project Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="projectName"
                                name="projectName"
                                value={post.projectName}
                                onChange={handleChange}
                                placeholder="Enter project name"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="jobTitle"
                                name="jobTitle"
                                value={post.jobTitle}
                                onChange={handleChange}
                                placeholder="Enter job title"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={post.description}
                                onChange={handleChange}
                                placeholder="Enter project description"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={post.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="skills">Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                id="skills"
                                name="skills"
                                value={post.skills}
                                onChange={handleChange}
                                placeholder="Enter required skills"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="budget">Budget</label>
                            <input
                                type="number"
                                className="form-control"
                                id="budget"
                                name="budget"
                                value={post.budget}
                                onChange={handleChange}
                                placeholder="Enter budget"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="date"
                                className="form-control"
                                id="deadline"
                                name="deadline"
                                value={post.deadline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Update Post</button>
            </form>
        </div>
    );
};

export default UpdatePost;
