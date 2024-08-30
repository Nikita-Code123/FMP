import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/post.employee.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Post() {
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [skills, setSkills] = useState('');
    const [budget, setBudget] = useState('');
    const [deadline, setDeadline] = useState('');

    const [errors, setErrors] = useState({}); // State for validation errors

    const handleBudgetChange = (event) => {
        const value = event.target.value;
        setBudget(value); // Store value as string
    };

   

    const handlePost = async (e) => {
        e.preventDefault();

        // if (!validateForm()) return; // If validation fails, stop form submission

        const employeeId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!employeeId || !token) {
            toast.error('Invalid data or not authenticated.');
            navigate('/dashboard/employee');
            return;
        }

        try {
            await axios.post('http://localhost:8000/FreelancerMarketplace/Employee/JobPosting', {
                projectName, 
                jobTitle, 
                description, 
                date, 
                skills, 
                budget, 
                deadline,
                employeeId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success("Post successfully created!", {
                style: {
                    position: "top-center",
                    backgroundColor: '#012a4a',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '5px'
                }
            });

            navigate('/dashboard/employee');
        } catch (err) {
            console.error("Error posting data:", err);
            toast.error('Error posting data. Please try again.', {
                style: {
                    position: "top-center",
                    backgroundColor: '#9b2226',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '5px'
                }
            });
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/employee');
    };

    return (
        <div className="post-container">
            <h1 className="post-title">Project Details</h1>
            <form onSubmit={handlePost} className="post-form">
                <div className="form-group post-form-group">
                    <label htmlFor="projectName">Project Name</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.projectName ? 'is-invalid' : ''}`} 
                        id="projectName" 
                        value={projectName} 
                        onChange={(e) => setProjectName(e.target.value)} 
                        placeholder="Enter project name" 
                        required
                    />
                    {/* {errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>} */}
                </div>
                <div className="form-group post-form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`} 
                        id="jobTitle" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        placeholder="Enter job title" 
                        required
                    />
                    {/* {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>} */}
                </div>
                <div className="form-group post-form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Enter project description" 
                        required
                    />
                    {/* {errors.description && <div className="invalid-feedback">{errors.description}</div>} */}
                </div>
                <div className="form-group post-form-group">
                    <label htmlFor="date">Date</label>
                    <input 
                        type="date" 
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`} 
                        id="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required
                    />
                    {/* {errors.date && <div className="invalid-feedback">{errors.date}</div>} */}
                </div>
                <div className="form-group post-form-group">
                    <label htmlFor="skills">Skills</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.skills ? 'is-invalid' : ''}`} 
                        id="skills" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)} 
                        placeholder="Enter required skills" 
                        required
                    />
                    {/* {errors.skills && <div className="invalid-feedback">{errors.skills}</div>} */}
                </div>
                <div className="form-group post-form-group">
                    <label htmlFor="budget">Budget</label>
                    <input 
                        type="number" 
                        className={`form-control ${errors.budget ? 'is-invalid' : ''}`} 
                        id="budget" 
                        value={budget} 
                        onChange={handleBudgetChange} 
                        placeholder="Enter budget" 
                        required
                    />
                    {/* {errors.budget && <div className="invalid-feedback">{errors.budget}</div>} */}
                </div>
                <div className="form-group post-form-group">
                    <label htmlFor="deadline">Deadline</label>
                    <input 
                        type="date" 
                        className={`form-control ${errors.deadline ? 'is-invalid' : ''}`} 
                        id="deadline" 
                        value={deadline} 
                        onChange={(e) => setDeadline(e.target.value)} 
                        required
                    />
                    {/* {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>} */}
                </div>
                <div className="post-buttons">
                    <button type="submit" className="btn post-button">Post</button>
                    <button type="button" className="btn post-cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Post;
