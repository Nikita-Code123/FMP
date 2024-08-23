import express from "express";
import { body } from "express-validator";
import {
    createPayment,
    getPayment,
} from "../controller/payment.controller.js";

const router = express.Router();

// Route to create a new payment
router.post("/createPayment",
    body("amount", "Amount is required").notEmpty(),
    body("freelancerId", "User ID is required").notEmpty(),
    body("proposalId", "Proposal ID is required").notEmpty(),
    createPayment
);

// Route to get a specific payment by ID
router.get("/getPaymenthistory/:id", getPayment);


// Route to get all payments for the authenticated user
// router.get("/myPayments", getMyPayments);

export default router;
