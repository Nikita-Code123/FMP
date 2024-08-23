import express from "express";
import { body } from "express-validator";
import {
    createRating,
    updateRating,
    getRating,
    deleteRating,
    getUserRatings,
    getProposalRatings
} from "../controller/rating.controller.js";

const router = express.Router();

// Route to create a new rating...
router.post("/createRating",
    body("rating", "Rating is required and must be between 1 and 5").isInt({ min: 1, max: 5 }),
    body("userId", "User ID is required").notEmpty(),
    body("proposalId", "Proposal ID is required").notEmpty(),
    body("comment", "Comment is optional").optional().isString(),
    body("reviewerRole", "Reviewer role is required").isIn(['freelancer', 'employer']),
    createRating
);

// Route to update a rating
router.put("/updateRating/:id",
    body("rating", "Rating must be between 1 and 5").optional().isInt({ min: 1, max: 5 }),
    body("comment", "Comment is optional").optional().isString(),
    updateRating
);

// Route to get a specific rating by ID
router.get("/getRating/:id", getRating);

// Route to delete a rating
router.delete("/deleteRating/:id", deleteRating);

// Route to get all ratings of a user
router.get("/userRatings/:userId", getUserRatings);

// Route to get all ratings for a proposal
router.get("/proposalRatings/:proposalId", getProposalRatings);

export default router;
