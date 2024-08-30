import React, { useState } from "react";
import axios from 'axios';
import SignUp from "./SignUp.js";
import '../styles/signin.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { RiAccountCircleLine } from 'react-icons/ri';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = selectedRole === 'Freelancer'
            ? 'http://localhost:8000/FreelancerMarketplace/Freelancer/Login'
            : selectedRole === 'Employee'
            ? 'http://localhost:8000/FreelancerMarketplace/Employee/Login'
            : null;

        if (!endpoint) {
            toast.error('Please select a role.');
            return;
        }

        try {
            const response = await axios.post(endpoint, 
                { email, password },
               
            );

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);

            toast.success("Successfully Logged In", {
                style: {
                    position: "top-center",
                    backgroundColor: '#012a4a',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '5px'
                }
            });

            navigate(selectedRole === 'Employee' ? '/dashboard/employee' : '/dashboard/freelancer');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error(error.response ? error.response.data.error : 'Invalid email or password. Please try again.', {
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

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const signup = () => {
        setShowSignUp(true);
    };

    if (showSignUp) {
        return <SignUp />;
    }

    return (
        <div className="signin-container">
            <h1 className='heading'>Welcome to Freelancer Marketplace</h1>
            <div className="signin-card">
                <h3 className="signin-title">Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email"><FaUserAlt /> Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"><FaLock /> Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='role-selection'>
                        <label><RiAccountCircleLine /> Select Role</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="freelancer"
                                name="role"
                                value="Freelancer"
                                checked={selectedRole === 'Freelancer'}
                                onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="freelancer">
                                Freelancer
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="employee"
                                name="role"
                                value="Employee"
                                checked={selectedRole === 'Employee'}
                                onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="employee">
                                Employee
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Sign In
                    </button>
                </form>
                <button className="signup-link" onClick={signup}>
                    Don't have an account? <span>Register</span>
                </button>
            </div>
        </div>
    );
}

export default SignIn;
