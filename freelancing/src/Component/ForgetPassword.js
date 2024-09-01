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
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            await axios.post('http://localhost:8000/FreelancerMarketplace/ForgotPassword/send-otp', { email });
            Swal.fire({
                icon: 'success',
                title: 'OTP Sent',
                text: 'Please check your email for the OTP.',
                background: '#012a4a',
                color: 'white',
                confirmButtonColor: '#38a3a5',
            });
            setStep(2);
        } catch (error) {
            console.error('Error sending OTP:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to send OTP. Please try again.',
                background: '#9b2226',
                color: 'white',
                confirmButtonColor: '#c71f37',
            });
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await axios.post('http://localhost:8000/FreelancerMarketplace/ForgotPassword/verify-otp', { email, otp });
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified',
                text: 'You can now set a new password.',
                background: '#012a4a',
                color: 'white',
                confirmButtonColor: '#38a3a5',
            });
            setStep(3);
        } catch (error) {
            console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Invalid OTP. Please try again.',
                background: '#9b2226',
                color: 'white',
                confirmButtonColor: '#c71f37',
            });
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post('http://localhost:8000/FreelancerMarketplace/ForgotPassword/reset-password', { email, newPassword });
            Swal.fire({
                icon: 'success',
                title: 'Password Reset',
                text: 'Your password has been reset successfully.',
                background: '#012a4a',
                color: 'white',
                confirmButtonColor: '#38a3a5',
            });
            navigate('/signin'); // Redirect to the sign-in page
        } catch (error) {
            console.error('Error resetting password:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to reset password. Please try again.',
                background: '#9b2226',
                color: 'white',
                confirmButtonColor: '#c71f37',
            });
        }
    };

    return (
        <div className="forgot-password-container">
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
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
