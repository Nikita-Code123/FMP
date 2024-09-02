import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/forgetpassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState('freelancer');
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const endpoint = userType === 'freelancer'
                ? 'http://localhost:8000/FreelancerMarketplace/ForgotPassword/send-otp'
                : 'http://localhost:8000/FreelancerMarketplace/ForgotPassword/e/send-otp';

            await axios.post(endpoint, { email });
            Swal.fire({
                icon: 'success',
                title: 'OTP Sent',
                text: 'Please check your email for the OTP.',
                background: '#012a4a',
                color: '#fff',
                confirmButtonColor: '#38a3a5',
                timer: 3000,
            });
            setStep(2);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to send OTP. Please try again.',
                background: '#9b2226',
                color: '#fff',
                confirmButtonColor: '#c71f37',
                timer: 3000,
            });
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const endpoint = userType === 'freelancer'
                ? 'http://localhost:8000/FreelancerMarketplace/ForgotPassword/verify-otp'
                : 'http://localhost:8000/FreelancerMarketplace/ForgotPassword/e/verify-otp';

            await axios.post(endpoint, { email, otp });
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified',
                text: 'You can now set a new password.',
                background: '#012a4a',
                color: '#fff',
                confirmButtonColor: '#38a3a5',
                timer: 3000,
            });
            setStep(3);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Invalid OTP. Please try again.',
                background: '#9b2226',
                color: '#fff',
                confirmButtonColor: '#c71f37',
                timer: 3000,
            });
        }
    };

    const handleResetPassword = async () => {
        try {
            const endpoint = userType === 'freelancer'
                ? 'http://localhost:8000/FreelancerMarketplace/ForgotPassword/reset-password'
                : 'http://localhost:8000/FreelancerMarketplace/ForgotPassword/e/reset-password';

            await axios.post(endpoint, { email, newPassword });
            Swal.fire({
                icon: 'success',
                title: 'Password Reset',
                text: 'Your password has been reset successfully.',
                background: '#012a4a',
                color: '#fff',
                confirmButtonColor: '#38a3a5',
                timer: 3000,
            });
            navigate('/signin');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to reset password. Please try again.',
                background: '#9b2226',
                color: '#fff',
                confirmButtonColor: '#c71f37',
                timer: 3000,
            });
        }
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to exit? All progress will be lost.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#38a3a5',
            cancelButtonColor: '#c71f37',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, go back'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-content">
                <div className="user-type-selection">
                    <label>
                        <input
                            type="radio"
                            value="freelancer"
                            checked={userType === 'freelancer'}
                            onChange={() => setUserType('freelancer')}
                        />
                        Freelancer
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="employee"
                            checked={userType === 'employee'}
                            onChange={() => setUserType('employee')}
                        />
                        Employee
                    </label>
                </div>

                {step === 1 && (
                    <div className="forgot-password-card">
                        <h3>Forgot Password</h3>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button onClick={handleSendOtp} className="btn btn-primary">Send OTP</button>
                        <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
                    </div>
                )}
                {step === 2 && (
                    <div className="forgot-password-card">
                        <h3>Enter OTP</h3>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <button onClick={handleVerifyOtp} className="btn btn-primary">Verify OTP</button>
                        <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
                    </div>
                )}
                {step === 3 && (
                    <div className="forgot-password-card">
                        <h3>Reset Password</h3>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button onClick={handleResetPassword} className="btn btn-primary">Reset Password</button>
                        <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
