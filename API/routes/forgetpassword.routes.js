
import { Router } from 'express';
import { sendOtp, verifyOtp, resetPassword } from '../controller/forget.user.controller.js';
import { resetPasswordE, sendOtpE, verifyOtpE } from '../controller/forget.employee.controller.js';

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);


router.post('/e/send-otp', sendOtpE);
router.post('/e/verify-otp', verifyOtpE);
router.post('/e/reset-password', resetPasswordE);
export default router;

