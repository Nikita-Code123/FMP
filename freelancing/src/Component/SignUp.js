import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn.js';
import '../styles/signup.css'; // Consider renaming this to a more generic name like 'auth.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { RiAccountCircleLine } from 'react-icons/ri';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [showSignIn, setShowSignIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const endpoint = selectedRole === 'Freelancer'
            ? 'http://localhost:8000/FreelancerMarketplace/Freelancer/Registration'
            : 'http://localhost:8000/FreelancerMarketplace/Employee/Registration';

        try {
            const response = await axios.post(endpoint, {
                username,
                email,
                password
            });

            console.log('Success', response.data);
            toast.success("Successfully Registered", {
                style: {
                    position: "top-center",
                    backgroundColor: '#012a4a',
                    color: 'white',
                    fontSize: '16px',
                    borderRadius: '5px'
                }
            });

            setShowSignIn(true);
        } catch (error) {
            console.error('Error', error);
            const errorMessage = error.response && error.response.data && error.response.data.errors
                ? `Error: ${error.response.data.errors[0].msg}`
                : 'An unexpected error occurred. Please try again.';
                
            toast.error(errorMessage, {
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

    if (showSignIn) {
        return <SignIn />;
    }

    return (
        <div className="signup-container">
            <h1 className='heading'>Welcome to Freelancer Marketplace</h1>
            <div className="signup-card">
                <h3 className="signup-title">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"><FaUserAlt /> Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"><FaEnvelope /> Email address</label>
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
                        Sign Up
                    </button>
                </form>
                <button className="signin-link" onClick={() => setShowSignIn(true)}>
                    Already Have an Account? <span>Click here</span>
                </button>
            </div>
        </div>
    );
}

export default SignUp;
