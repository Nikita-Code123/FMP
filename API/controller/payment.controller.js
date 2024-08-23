import { validationResult } from "express-validator";
import Payment from "../model/payment.model.js";
import Employee from "../model/employee.model.js";
import Project from "../model/project.model.js";
import User from "../model/user.model.js";
import Proposal from "../model/proposal.model.js";

// Controller to create a payment
export const createPayment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad request", errors: errors.array() });
        }

        const { amount,
            freelancerId,
            status,
            paymentMethod,
            proposalId,
            projectId,
            employeeId } = req.body;

        // Verify if the user and proposal exist
        const user = await User.findByPk(freelancerId);
        const proposal = await Proposal.findByPk(proposalId);

        if (!user || !proposal) {
            return res.status(404).json({ error: "User or Proposal not found" });
        }

        const payment = await Payment.create({
            amount,
            freelancerId,
            status,
            paymentMethod,
            proposalId,
            projectId,
            employeeId
        });

        return res.status(201).json({ message: "Payment created successfully", payment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};




// Controller to get payment details
export const getPayment = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const payment = await Payment.findByPk(paymentId, {include: [
            { model: User},//, as: 'freelancerId'
            { model: Project }, //, as: 'projectId'
            { model: Employee}//, as: 'employeeId' 
        ]
    });

        if (payment) {
            return res.status(200).json({ payment });
        }else{
            return res.status(401).json({error : "Payment not found"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



// // Controller to get all payments for the authenticated user
// export const getMyPayments = async (req, res) => {
//     try {
//         // Assuming user ID is passed in the request user object
//         const userId = req.user.id;

//         const payments = await Payment.findAll({ where: { userId } });

//         if (payments.length === 0) {
//             return res.status(404).json({ error: "No payments found for this user" });
//         }

//         return res.status(200).json({ payments });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };
