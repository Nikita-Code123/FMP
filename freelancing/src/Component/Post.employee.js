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
    const [budget, setBudget] = useState(0);
    const [deadline, setDeadline] = useState('');

    const handleBudgetChange = (event) => {
        const value = event.target.value;
        setBudget(parseInt(value, 10) || 0); // Use 0 as default if parseInt returns NaN
    };

    const handlePost = async (e) => {
        e.preventDefault();

        const user = localStorage.getItem('user');
        if (!user) {
            toast.error('User not logged in.');
            navigate('/dashboard/employee'); 
            return;
        }

        let employeeId;
        try {
            const parsedUser = JSON.parse(user);
            employeeId = parsedUser.id;
        } catch (error) {
            console.error('Error parsing user data:', error);
            toast.error('Error parsing user data.');
            navigate('/dashboard/employee');
            return;
        }

        if (!employeeId) {
            toast.error('Invalid user data.');
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
        <div className="container mt-5">
            <h1 className="mb-4 details">Project Details</h1>
            <form onSubmit={handlePost}>
                <div className="form-group mb-3">
                    <label htmlFor="projectName">Project Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="projectName" 
                        value={projectName} 
                        onChange={(e) => setProjectName(e.target.value)} 
                        placeholder="Enter project name" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="jobTitle" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        placeholder="Enter job title" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Enter project description" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="date">Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="skills">Skills</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="skills" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)} 
                        placeholder="Enter required skills" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="budget">Budget</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="budget" 
                        value={budget} 
                        onChange={handleBudgetChange} 
                        placeholder="Enter budget" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="deadline">Deadline</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="deadline" 
                        value={deadline} 
                        onChange={(e) => setDeadline(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn posted">Post</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default Post;
