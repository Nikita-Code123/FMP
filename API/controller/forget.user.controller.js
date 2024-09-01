import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../model/user.model.js';

const otpMap = new Map();

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER || 'nikita.sahu@softude.com',
        pass: process.env.EMAIL_PASS || 'Sipl@12345',
    },
});

// Function to send OTP to email
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = crypto.randomInt(100000, 999999);
        otpMap.set(email, otp);

        const mailOptions = {
            from: process.env.EMAIL_USER || 'nikita.sahu@softude.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
                return res.status(500).json({ error: 'Error sending email' });
            }
            console.log('OTP email sent:', info.response);
            res.json({ message: 'OTP sent to email' });
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to verify OTP
export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (otpMap.get(email) == otp) {
        otpMap.delete(email);
        res.json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ error: 'Invalid OTP' });
    }
};

// Function to reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = newPassword; // Ensure to hash the password before saving it
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
