import React, { useState } from "react";
import axios from 'axios';
import SignUp from "./SignUp.js"; 
import '../styles/signin.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

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
            const response = await axios.post(endpoint, {
                email,
                password
            });
            
            // Assuming the response contains a user object with an id and a token
            const { user, token } = response.data;

            localStorage.setItem('token', token); // Store token in local storage
            localStorage.setItem('user', JSON.stringify(user)); // Store the entire user object

            toast.success("Successfully Logged In", {
                style: {
                    position: "top-center",
                    backgroundColor: '#012a4a',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '5px'
                }
            });

            // Redirect to dashboard based on role
            if (selectedRole === 'Employee') {
                navigate('/dashboard/employee'); // Redirect to Employee dashboard
            } else if (selectedRole === 'Freelancer') {
                navigate('/dashboard/freelancer'); // Redirect to Freelancer dashboard
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Invalid email or password. Please try again.', {
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
        <div className="container">
            <h1 className='heading'>Welcome To Freelancer Marketplace</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Sign In</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
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
                                    <label htmlFor="password">Password</label>
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

                                <div className='radiobtn m-3'>
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

                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign In
                                </button>
                            </form>
                            <button className="already text-center" onClick={signup}>
                                Don't have an account? <span style={{color: "blue"}}>Register</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
