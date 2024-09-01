
import { Router } from 'express';
import { sendOtp, verifyOtp, resetPassword } from '../controller/forget.user.controller.js';

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;

