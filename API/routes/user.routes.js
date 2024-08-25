import express from 'express';
import {getprofile, signin, signup ,getAllProjects} from '../controller/user.controller.js';
import { body } from 'express-validator';
import { authenticateJWT } from './authmiddleware.js'; // Import the middleware
import { deleteProposal, getProposal, proposal, updateProposal } from '../controller/proposal.controller.js';
const router = express.Router();

// Public Routes
router.post(
  "/Login",
  body("email", "Email ID is not correct").isEmail(),
  body("email", "Email ID is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
  body("password", "Password must contain at least 4 letters").isLength({ min: 4 }),
  signin
);

router.post(
  "/Registration",
  body("username", "Username is required").notEmpty(),
  body("email", "Email ID is not correct").isEmail(),
  body("email", "Email ID is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
  body("password", "Password must contain at least 4 letters").isLength({ min: 4 }),
  signup
);

// Protected Routes (Example: Project Proposal routes)
router.post(
  "/projectProposal",
  authenticateJWT, // Add authentication middleware
  body("projectId", "Project ID is required").notEmpty(),
  body("coverLetter", "Cover letter is required").notEmpty(),
  body("proposedBudget", "Proposed budget is required").notEmpty(),
  body("estimatedTimeline", "Estimated timeline is required").notEmpty(),
  proposal
);

router.put(
  "/updateProposal/:id",
  authenticateJWT, // Add authentication middleware
  body("projectId", "Project ID is required").notEmpty(),
  body("coverLetter", "Cover letter is required").notEmpty(),
  body("proposedBudget", "Proposed budget is required").notEmpty(),
  body("estimatedTimeline", "Estimated timeline is required").notEmpty(),
  updateProposal
);

router.delete(
  "/deleteProposal/:id",
  authenticateJWT, // Add authentication middleware
  deleteProposal
);

router.get(
  "/proposal/:id",
  authenticateJWT, // Add authentication middleware
  getProposal
);
router.get("/profile/:id",getprofile);
router.get('/projects', getAllProjects);
export default router;
