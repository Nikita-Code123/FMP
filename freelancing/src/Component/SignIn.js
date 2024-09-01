import React, { useState } from "react";
import axios from 'axios';
import SignUp from "./SignUp.js";
import '../styles/signin.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Link } from "react-router-dom";

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a role!',
                position: 'top-center',
                background: '#fff',
                color: '#000',
                confirmButtonColor: '#012a4a',
            });
            return;
        }

        try {
            const response = await axios.post(endpoint, { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);

            Swal.fire({
                icon: 'success',
                title: 'Logged in Successfully',
                position: 'top-center',
                background: '#012a4a',
                color: 'white',
                confirmButtonColor: '#38a3a5',
            });

            navigate(selectedRole === 'Employee' ? '/dashboard/employee' : '/dashboard/freelancer');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);

            if (error.response && error.response.status === 401) {
                // Token expired
                Swal.fire({
                    icon: 'error',
                    title: 'Session Expired',
                    text: 'Your session has expired. Please log in again.',
                    position: 'top-center',
                    background: '#9b2226',
                    color: 'white',
                    confirmButtonColor: '#c71f37',
                });

                // Clear the token from localStorage and redirect to the homepage
                localStorage.removeItem('token');
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response ? error.response.data.error : 'Invalid email or password. Please try again.',
                    position: 'top-center',
                    background: '#9b2226',
                    color: 'white',
                    confirmButtonColor: '#c71f37',
                });
            }
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
                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            </div>
        </div>
    );
}

export default SignIn;
